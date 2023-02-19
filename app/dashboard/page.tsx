'use client'

import { WalletAddress } from '@turbo-eth/core-wagmi'
import { ERC721Image, ERC721Name } from '@turbo-eth/erc721-wagmi'
import { motion } from 'framer-motion'

import DashboardSidebar from '@/components/layout/DashboardSidebar'
import BalanceCard from '@/components/layout/BalanceCard'
import HistoricPrizes from '@/components/layout/HistoricPrizes'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PageDashboard() {
  return (
    <>
      <div className="flex-center h-full container mx-auto flex flex-1 flex-col items-center justify-center">
        <motion.div
          className="grid w-full flex-1 grid-cols-12 gap-x-10"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}>
          <div className="bg-gradient-primary col-span-12 flex w-full flex-col rounded-lg p-6 shadow-lg lg:col-span-3">
            <div className="flex flex-col items-center">
              <ERC721Image
                // @ts-ignore
                tokenId={1}
                address={'0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8'}
                className=" mx-auto my-4 w-[90px] rounded-xl border-2 border-white shadow-md"
              />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  <WalletAddress isLink truncate styled />
                </h5>
            </div>
            <hr className="my-5 dark:border-gray-200 dark:opacity-50" />
            <DashboardSidebar className="h-full flex-1" />
          </div>
          <div className="bg-gradient-primary col-span-12 flex w-full rounded-lg shadow-lg lg:col-span-9 grid grid-rows-3 grid-flow-col gap-2 p-3">
            <div className="border-2 border-purple-700 p-3 bg-slate-700 rounded-lg col-span-9 flex w-full "><BalanceCard /></div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:bg-gradient-to-r col-span-9 flex w-full " ></div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:bg-gradient-to-r col-span-9 flex w-full "></div>
            <div className="border-2 border-purple-700 p-3 bg-slate-700 rounded-lg hover:bg-gradient-to-r col-span-9 flex w-full "><HistoricPrizes /></div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:bg-gradient-to-r col-span-9 flex w-full "></div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:bg-gradient-to-r col-span-9 flex w-full "></div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
