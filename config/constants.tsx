export enum APIs {
  EthGasStation = 'ETH Gas Station',
  // EthGasWatch = 'ETH Gas Watch',
  GasNow = 'GasNow'
};

interface IUri {
  id: APIs
  uri: string
};

export const URIs: IUri[] = [
  {
    id: APIs.GasNow,
    uri: 'https://www.gasnow.org/api/v3/gas/price'
  },
  {
    id: APIs.EthGasStation,
    uri: 'https://ethgasstation.info/json/ethgasAPI.json'
  },
  {
    id: APIs.EthGasWatch,
    uri: 'https://ethgas.watch/api/gas'
  },
];


export const defaultSettings: object = {
  interval: 0,
  api: APIs.EthGasStation 
};
