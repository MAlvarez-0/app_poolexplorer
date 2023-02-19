import * as React from 'react'
import { ADDRESS } from '../shared/ConstAddresses';

import { erc20ABI, useContractRead, useAccount } from 'wagmi';
import { utils } from 'ethers';

import classNames from 'clsx'

function checkAmount(amount, decimals) {
    if (amount != undefined) {
        return (utils.formatUnits(amount, String(decimals)).slice(0, -3));
    } else {
        return 0.0;
    }
}

function addAmountToInfoButton(network, amount, decimals) {
    if (amount != undefined && amount != 0x00) {
      return <div className='flex flex-row justify-center'>
      <img className='mr-2' width={16} height={16} src={"/icons/" + network + "_icon.png"}/> ${(utils.formatUnits(amount, String(decimals)).slice(0, -3))}
      <br/></div>;
    }
  }

function Tooltip({decimals, amountOP, amountEth, amountPol, amountAva, children }) {
    return (
    <div class="group relative flex">
        {children}
        <div class="absolute left-6 scale-0 transition-all rounded bg-gray-800 p-5 text-xs text-white group-hover:scale-100">
            {addAmountToInfoButton("optimism", amountOP, decimals)}            
            {addAmountToInfoButton("ethereum", amountEth, decimals)}
            {addAmountToInfoButton("polygon", amountPol, decimals)}
            {addAmountToInfoButton("avalanche", amountAva, decimals)}
        </div>
    </div>
    )
}

interface BalanceCardProps {
  className?: string
}
export const BalanceCard = ({ className }: BalanceCardProps) => {
  const cx = classNames(className, 'flex flex-col gap-1 w-full h-full', 'BalanceCard')

  const { data: decimals } = useContractRead({
    chainId: 10,
    address: '0x62BB4fc73094c83B5e952C2180B23fA7054954c4',
    functionName: 'decimals',
  });
  const { data: amountOP} = useContractRead({
    address: ADDRESS.OPTIMISM.TICKET,
    abi: erc20ABI,
    chainId: 10,
    functionName: 'balanceOf',
    args: [useAccount().address],
  })

  const { data: amountEther} = useContractRead({
    address: ADDRESS.ETHEREUM.TICKET,
    abi: erc20ABI,
    chainId: 1,
    functionName: 'balanceOf',
    args: [useAccount().address],
  })

  const { data: amountPol} = useContractRead({
    address: ADDRESS.POLYGON.TICKET,
    abi: erc20ABI,
    chainId: 137,
    functionName: 'balanceOf',
    args: [useAccount().address],
  })

  const { data: amountAva} = useContractRead({
    address: ADDRESS.AVALANCHE.TICKET,
    abi: erc20ABI,
    chainId: 43114,
    functionName: 'balanceOf',
    args: [useAccount().address],
  })

  return (
    <div className={cx}>
        <h1 class="mb-4 font-extrabold leading-none tracking-tight text-gray-900 lg:text-2xl dark:text-white"><span class="bg-clip-text">Total Balance</span></h1>
        <div className="flex flex-row justify-center">
            <div class="flex text-transparent text-5xl font-extrabold bg-clip-text bg-gradient-to-r from-purple-500 to-sky-400">$ {checkAmount(amountOP, decimals)}
                <Tooltip decimals={decimals} amountOP={amountOP} amountAva={amountAva} amountEth={amountEther} amountPol={amountPol}>
                    <button class="w-5 h-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                            </svg>       
                    </button>
                </Tooltip>
            </div>
        </div>
    </div>
  )
}
export default BalanceCard
