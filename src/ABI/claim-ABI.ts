export const claimABI = [
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