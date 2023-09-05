export const claimABI = [{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"contract IConnext","name":"_connext","type":"address"},{"internalType":"uint256","name":"_total","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"},{"internalType":"uint256","name":"_voteFactor","type":"uint256"},{"components":[{"internalType":"uint128","name":"time","type":"uint128"},{"internalType":"uint128","name":"vestedFraction","type":"uint128"}],"internalType":"struct Tranche[]","name":"_tranches","type":"tuple[]"},{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"},{"internalType":"uint160","name":"_maxDelayTime","type":"uint160"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"int256","name":"amount","type":"int256"}],"name":"Adjust","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint32","name":"recipientDomain","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"CrosschainClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"bar","type":"address"}],"name":"Foo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"InitializeDistributionRecord","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"},{"indexed":false,"internalType":"string","name":"uri","type":"string"},{"indexed":false,"internalType":"uint256","name":"fractionDenominator","type":"uint256"}],"name":"InitializeDistributor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint160","name":"maxDelayTime","type":"uint160"}],"name":"SetDelay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"merkleRoot","type":"bytes32"}],"name":"SetMerkleRoot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"recipient","type":"address"}],"name":"SetSweepRecipient","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"}],"name":"SetToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"SetTotal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"time","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"VestedFraction","type":"uint128"}],"name":"SetTranche","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"uri","type":"string"}],"name":"SetUri","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"voteFactor","type":"uint256"}],"name":"SetVoteFactor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SweepNative","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SweepToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"VERSION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"int256","name":"amount","type":"int256"}],"name":"adjust","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint32","name":"pos","type":"uint32"}],"name":"checkpoints","outputs":[{"components":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint224","name":"votes","type":"uint224"}],"internalType":"struct ERC20Votes.Checkpoint","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_total","type":"uint256"},{"internalType":"bytes32[]","name":"_proof","type":"bytes32[]"}],"name":"claimByMerkleProof","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint32","name":"_recipientDomain","type":"uint32"},{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint32","name":"_beneficiaryDomain","type":"uint32"},{"internalType":"uint256","name":"_total","type":"uint256"},{"internalType":"bytes","name":"_signature","type":"bytes"},{"internalType":"bytes32[]","name":"_proof","type":"bytes32[]"}],"name":"claimBySignature","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"connext","outputs":[{"internalType":"contract IConnext","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distancePerSecond","outputs":[{"internalType":"uint160","name":"","type":"uint160"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"domain","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"beneficiary","type":"address"}],"name":"getClaimableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"beneficiary","type":"address"}],"name":"getDistributionRecord","outputs":[{"components":[{"internalType":"bool","name":"initialized","type":"bool"},{"internalType":"uint120","name":"total","type":"uint120"},{"internalType":"uint120","name":"claimed","type":"uint120"}],"internalType":"struct DistributionRecord","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getFairDelayTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFractionDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMerkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSweepRecipient","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getTranche","outputs":[{"components":[{"internalType":"uint128","name":"time","type":"uint128"},{"internalType":"uint128","name":"vestedFraction","type":"uint128"}],"internalType":"struct Tranche","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTranches","outputs":[{"components":[{"internalType":"uint128","name":"time","type":"uint128"},{"internalType":"uint128","name":"vestedFraction","type":"uint128"}],"internalType":"struct Tranche[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"time","type":"uint256"}],"name":"getVestedFraction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"getVoteFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_domain","type":"uint32"},{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"initializeDistributionRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxDelayTime","outputs":[{"internalType":"uint160","name":"","type":"uint160"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"randomValue","outputs":[{"internalType":"uint160","name":"","type":"uint160"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_recipient","type":"address"}],"name":"setSweepRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"}],"name":"setToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_total","type":"uint256"}],"name":"setTotal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint128","name":"time","type":"uint128"},{"internalType":"uint128","name":"vestedFraction","type":"uint128"}],"internalType":"struct Tranche[]","name":"_tranches","type":"tuple[]"}],"name":"setTranches","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"setUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_voteFactor","type":"uint256"}],"name":"setVoteFactor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sweepNative","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sweepNative","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sweepToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"bytes","name":"_callData","type":"bytes"}],"name":"xReceive","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"}]