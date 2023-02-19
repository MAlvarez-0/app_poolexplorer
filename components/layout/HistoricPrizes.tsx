import * as React from 'react'
import { ADDRESS } from '../shared/ConstAddresses';
import { GetClaimsHistory } from './GetClaimHistory';
import { erc20ABI, useContractRead, useAccount } from 'wagmi';
import { utils } from 'ethers';

import classNames from 'clsx'

async function getHistory() {
    let poolerClaims = await GetClaimsHistory(useAccount().address)
    return poolerClaims
}


interface HistoricPrizesCardProps {
  className?: string
}
export const HistoricPrizes = ({ className }: HistoricPrizesCardProps) => {
  const cx = classNames(className, 'flex flex-col gap-1 w-full h-full', 'HistoricPrizes')
  
  let historicPrizes;

  getHistory().then(((value) => {
    historicPrizes = value
    // Expected output: "Success!"
  }))
  console.log(historicPrizes)


  return (
    <div className={cx}>
        <h1 class="mb-4 font-extrabold leading-none tracking-tight text-gray-900 lg:text-2xl dark:text-white"><span class="bg-clip-text">Prizes</span></h1>
        
<div class="">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Draw
                </th>
                <th scope="col" class="">
                    Network
                </th>
                <th scope="col" class="">
                    Prize
                </th>
                <th scope="col" class="">
                    Claim
                </th>
            </tr>
        </thead>
        <tbody>
            {historicPrizes.map(((value) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {value}
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
            )))}
            
        </tbody>
    </table>
</div>

    </div>
  )
}
export default HistoricPrizes
