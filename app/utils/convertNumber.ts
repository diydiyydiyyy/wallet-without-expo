import {ethers} from 'ethers';

export const FromHex = (value: string) => {
  const convert = ethers.utils.formatUnits(value, 'ether');

  return {
    value: convert,
  };
};

export const ToHex = (value: string) => {
  const convert = ethers.utils.hexlify(
    ethers.utils.formatUnits(value, 'ether'),
  );

  return {
    value: convert,
  };
};
