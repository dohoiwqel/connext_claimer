import { getTxUrl, useAnalytics, useAuth, useNetworks, useToast, useWallet, useAccount } from '@tokensoft-web/common-utils'
import { useEffect } from 'react'
import { useSubmitClaim } from '../../utils/claim'
import { VscLinkExternal } from 'react-icons/vsc'
import { Sale } from '../../utils/interface'
import { isCrosschainDistributorType, isContinuousVestingType, isTrancheVestingType, isSatelliteContract } from "../../utils/abi"
import { IoChevronDownCircleOutline } from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import classNames from 'classnames'
import { isSmartContractWallet } from '../../utils/wallet'
import { useWalletClient } from 'wagmi'

const ClaimButton = ({
  className,
  claimData,
  _chainId,
  sale,
  disabled,
  onMinedTransaction,
  onSubmitTransaction,
  text
}: {
  className?: string,
  key?: number
  _chainId: number
  claimData: {
    chainId: any
    symbol: string
    distributorAddress: string
    saleId?: string
    interfaces?: any[]
    proof?: string[]
    proofIndex?: number
    proofAmount?: string,
    recipientDomain?: number,
    beneficiary?: string,
    beneficiaryDomain?: number
  }
  sale?: Sale,
  disabled?: boolean
  text?: string,
  onMinedTransaction?: Function
  onSubmitTransaction?: Function
}) => {
  const { chainId, symbol, distributorAddress, interfaces, proof, proofIndex, proofAmount, recipientDomain, beneficiary, beneficiaryDomain } = claimData
  const { connectedChainId, supportedNetwork } = useWallet()
  const { user: { walletAddress } } = useAuth()
  const { account } = useAccount()
  const { getNetworkDetails } = useNetworks()
  const { showErrorToast, showInfoToast, showSuccessToast } = useToast()
  const { pageEvent } = useAnalytics()
  const isSmartContract = isSmartContractWallet(account.wallets, walletAddress)

  const { data: walletClient } = useWalletClient()

  const getDefaultText = _symbol => !!_symbol ? `Claim ${_symbol}` : 'Claim Tokens'

  const {
    error,
    isLoading,
    isSubmitting,
    isError,
    transferId,
    write: sendSubmitClaim,
    data: submitClaimReceipt
  } = useSubmitClaim(interfaces, isSmartContract)
  
  useEffect(() => {
    if (submitClaimReceipt) {
      if (submitClaimReceipt.status === 'success') {
        onMinedTransaction && onMinedTransaction(submitClaimReceipt.transactionHash, transferId)

        showSuccessToast({
          description: (
            <div className='flex flex-row'>
              Successfully submitted claim.
              <a
                target='_blank'
                rel='noreferrer'
                href={getTxUrl(submitClaimReceipt.transactionHash, getNetworkDetails(connectedChainId))}
                className='w-[30px] flex items-center justify-center text-white'
                onClick={e => e.stopPropagation()}
              >
                <VscLinkExternal color='white'/>
              </a>
            </div>
          )
        })

        if (sale) {
          pageEvent('purchase', 'submitClaim')
        } else {
          pageEvent('claim', 'submitClaim')
        }
      }
    }
  }, [submitClaimReceipt])

  useEffect(() => {
    if (error) {
      showErrorToast({
        description: error.toString()
      })
    }
  }, [error])

  const showInvalidNetwork = () => {
    const networkDetails = getNetworkDetails(chainId)

    showErrorToast({
      description: (<span>Please connect to the {networkDetails.name} network to claim your {symbol} tokens</span>)
    })
  }

  const getArgsForClaimInterfaceId = async (interfaces: string[]) => {
    if (isSatelliteContract(interfaces)) {
      // Uses the `msg.sender` and `this.domain` to initiate a claim on the distributor via
      // Connext.xcall(...) that sends the funds to the caller on this chain. Should validate
      // the proof despite not enforcing it to fail here rather than on the distributor chain.
      // function initiateClaim(
      //   uint256 _amount,
      //   bytes32[] calldata _proof
      // ) external;
      return [proofAmount, proof]
    }
    
    if (isCrosschainDistributorType(interfaces)) {
      if (isSmartContract) {
        // Handles messages dispatched by the `Satellite` contract on the same chain.
        // function claimByMerkleProof(
        //   address beneficiary,
        //   uint256 amount,
        //   bytes32[] memory proof
        // ) external onlySatellite;
        return [walletAddress, proofAmount, proof]
      } else {
        // Handles messages dispatched by EOA user on any chain, to any chain.
        // function claimBySignature(
        //   address recipient,
        //   uint32 recipientDomain,
        //   address beneficiary,
        //   uint32 beneficiaryDomain,
        //   uint256 amount,
        //   bytes calldata signature,
        //   bytes32[] memory proof
        // ) external;
        const txData = [
          { name: "recipient", type: "address", value: walletAddress },
          { name: "recipientDomain", type: "uint32", value: recipientDomain }, //1634886255 для арбы
          { name: "beneficiary", type: "address", value: beneficiary },
          { name: "beneficiaryDomain", type: "uint32", value: beneficiaryDomain }, //1634886255 для арбы
          { name: "amount", type: "uint256", value: proofAmount }
        ]

        const getSignatureHash = (txData: any[]) => {
          return ethers.utils.arrayify(ethers.utils.solidityKeccak256(txData.map(t => t.type), txData.map(t => t.value)))
        }

        const hash = getSignatureHash(txData)
        try {
          const signature = await walletClient.signMessage({
            account: walletAddress,
            message: { raw: hash }
          })
  
          return [walletAddress, recipientDomain, beneficiary, beneficiaryDomain, proofAmount, signature, proof]
        } catch (e) {
          throw new Error(e.message)
        }
      }
    }

    if (isContinuousVestingType(interfaces) || isTrancheVestingType(interfaces)) {
      return [proofIndex, walletAddress, proofAmount, proof]
    }

    return [walletAddress]
  }

  const submitClaim = async () => {
    if (connectedChainId !== chainId) {
      showInvalidNetwork()
      return
    }
    
    try {
      const args = await getArgsForClaimInterfaceId(interfaces)
      
      const response = await sendSubmitClaim(connectedChainId, distributorAddress, args)
      const transactionHash = response.hash

      if (transactionHash) {
        onSubmitTransaction && onSubmitTransaction(transactionHash)

        showInfoToast({
          description: (
            <div className='flex flex-row'>
              Submitting claim.
              <a
                target='_blank'
                rel='noreferrer'
                href={getTxUrl(transactionHash, getNetworkDetails(connectedChainId))}
                className='w-[30px] flex items-center justify-center text-white'
                onClick={e => e.stopPropagation()}
              >
                <VscLinkExternal color='white' />
              </a>
            </div>
          )
        })
      }
    } catch (e) {
      showErrorToast({
        description: e.message
      })
    }
  }

  const disableClaimButton = isLoading || disabled || !proofAmount || !supportedNetwork || isSubmitting
  const showLoadingIndicator = (isLoading || isSubmitting) && !isError

  return (
    <button
      className={classNames('btn btn-primary btn-xs', className)}
      onClick={submitClaim}
      disabled={disableClaimButton}
    >
      {showLoadingIndicator ? (
        <div className='flex flex-row justify-center items-center'>
          <div className='animate-spin'>
            <AiOutlineLoading3Quarters size={16} />
          </div>
          <span className='pl-2'>Claiming...</span>
        </div>
      ) : (
        <div className='flex flex-row justify-center items-center'>
          <IoChevronDownCircleOutline className="text-xl mr-1" />
          <span className='self-center font-semibold'>{text || getDefaultText(symbol)}</span>
        </div>
      )}
    </button>
  )
}

export default ClaimButton

[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "recipientDomain",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "beneficiaryDomain",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes"
			},
			{
				"internalType": "bytes32[]",
				"name": "proof",
				"type": "bytes32[]"
			}
		],
		"name": "claimBySignature",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]