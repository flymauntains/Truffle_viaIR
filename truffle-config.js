const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config();
const {
  MNEMONIC,
  ENDPOINT_SEPOLIA, ENDPOINT_ETHEREUM,
  API_ETHERSCAN, API_BSCSCAN,
} = process.env;



module.exports = {
  // Configure your compilers
  contracts_directory: "./contracts",
  contracts_build_directory: "./build",
  migrations_directory: "./migrations",

  compilers: {
    solc: {
      version: "0.8.20",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {             // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
        viaIR: true,
        // evmVersion: "byzantium",
      },
    },
  },

  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a managed Ganache instance for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache, geth, or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 9545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },

    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, ENDPOINT_SEPOLIA),
      network_id: 11155111,  // Sepolia chainId
      confirmations: 2,      // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,    // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets)
      production: true,      // Treats this network as if it was a public net. (default: false)
      networkCheckTimeout: 30000,
      //deploymentPollingInterval: 8000,
    },

    ethereum: {
      provider: () => new HDWalletProvider(MNEMONIC, ENDPOINT_ETHEREUM),
      network_id: 1,         // Ethereum chainId
      confirmations: 2,      // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,    // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets)
      production: true,      // Treats this network as if it was a public net. (default: false)
      networkCheckTimeout: 30000,
      //deploymentPollingInterval: 8000,
    },

    bsc: {
      provider: () => new HDWalletProvider(MNEMONIC, "https://bsc-dataseed1.binance.org/"),
      network_id: 56,        // BSC chainId
      confirmations: 2,      // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,    // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false,     // Skip dry run before migrations? (default: false for public nets)
      production: true,      // Treats this network as if it was a public net. (default: false)
      networkCheckTimeout: 30000,
      //deploymentPollingInterval: 8000,
    },

    // An additional network, but with some advanced options…
    // advanced: {
    //   port: 8777,             // Custom port
    //   network_id: 1342,       // Custom network
    //   gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    //   gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    //   from: <address>,        // Account to send transactions from (default: accounts[0])
    //   websocket: true         // Enable EventEmitter interface for web3 (default: false)
    // },
    //
    // Useful for deploying to a public network.
    // Note: It's important to wrap the provider as a function to ensure truffle uses a new provider every time.
    // goerli: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`),
    //   network_id: 5,       // Goerli's id
    //   confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    //
    // Useful for private networks
    // private: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://network.io`),
    //   network_id: 2111,   // This network is yours, in the cloud.
    //   production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  plugins: [
    "truffle-plugin-verify",
    "truffle-contract-size",
  ],

  api_keys: {
    etherscan: API_ETHERSCAN,
    bscscan: API_BSCSCAN,
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
