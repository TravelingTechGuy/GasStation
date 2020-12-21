import {APIs, URIs} from '../config/constants';

export interface IPricesResult {
  slow: number,
  average: number,
  fast: number,
  faster: number,
};

const formatResult = (apiId: APIs, gas: any): IPricesResult => {
  let result: IPricesResult;
  console.log(apiId, gas)
  switch(apiId) {
    case APIs.EthGasStation:
      result = {
        slow: Math.round(gas.safeLow / 10),
        average: Math.round(gas.average / 10),
        fast: Math.round(gas.fast / 10),
        faster: Math.round(gas.fastest / 10)
      };
      break;
    case APIs.EthGasWatch:
      result = {
        slow: gas.slow.gwei,
        average: gas.normal.gwei,
        fast: gas.fast.gwei,
        faster: gas.instant.gwei
      };
      break;
    case APIs.GasNow:
      result = {
        slow: Math.round(gas.data.slow / 1e9),
        average: Math.round(gas.data.standard / 1e9),
        fast: Math.round(gas.data.fast / 1e9),
        faster: Math.round(gas.data.rapid / 1e9)
      };
      break;
  }
  return result;
};

export const callApi = async (apiId: APIs): Promise<IPricesResult> => {
  console.log('Fetching from', apiId);
  try {
     let apiUri: string | undefined = URIs.find(a => a.id === apiId)?.uri;
     if(!apiUri) {
       throw new Error('api not found');
     }
     let response = await fetch(apiUri);
     console.log (response)
     let gas = await response.json();
     return formatResult(apiId, gas); 
  }
  catch(err) {
    console.error(err,'xxx');
    throw err;
  }
};
