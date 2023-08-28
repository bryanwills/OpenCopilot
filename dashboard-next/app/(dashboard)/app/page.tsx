import DashboardCard01 from "@/ui/charts/line-charts/dashboard-charts/DashboardLinechart1";
import DashboardCard02 from "@/ui/charts/line-charts/dashboard-charts/DashboardLinechart2";
import { Heading } from "@/ui/components/Heading";
import WelcomeBanner from "@/ui/partials/WelcomeBanner";
import { Link } from "@/ui/router-events";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/ui/components/headless/Dialog";
import { ChatBotCard } from "@/ui/partials/ChatBotCard";
import { Button } from "@/ui/components/Button";
import instance from "utils/axiosInstance";
import { type Bot } from "schemas";
import EmptyState from "@/ui/partials/EmptyState";
import dynamic from "next/dynamic";
import { AiOutlinePlus } from "react-icons/ai";
import { Map } from "@/ui/helper-components";

const CreateBot = dynamic(() => import("@/ui/partials/CreateBot"), {
  ssr: false,
});

async function DashboardIndex() {
  const response = await instance.get<Bot[] | []>("/bots");

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-[96rem] mx-auto">
      <WelcomeBanner />
      <div className="w-full flex items-center justify-end mb-5">
        <div className="flex items-center gap-2">
          <Button
            variant={{ intent: "primary" }}
            className="flex-center gap-1 max-h-[34px] sm:hidden"
            asChild
          >
            <Link href="/app/bot/new">
              <AiOutlinePlus className="h-4 w-4" />
              <span className="hidden sm:inline-flex">create Copilot</span>
            </Link>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={{ intent: "primary" }}
                className="gap-1 max-h-[34px] hidden sm:flex items-center justify-center"
              >
                <AiOutlinePlus className="h-4 w-4" />
                <span className="hidden sm:inline-flex">create Copilot</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="min-h-fit p-5 max-w-xl">
              <CreateBot />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <section className="max-w-[96rem] w-full mt-5">
        <div className="w-full flex items-center justify-between mb-5">
          <Heading level={3} className="font-bold">
            My Copilots ✨
          </Heading>
          <div></div>
        </div>
        <div className="w-full max-w-full">
          <div className="grid grid-cols-12 gap-6">
            <Map
              data={response?.data}
              render={(bot, i) => <ChatBotCard {...bot} key={i} />}
              fallback={
                <EmptyState
                  label="There is no Copilots Right now"
                  description="start by creating new one"
                  className="col-span-full"
                >
                  <Button
                    asChild
                    variant={{
                      intent: "primary",
                      size: "sm",
                    }}
                  >
                    <Link href="/app/bot/new">Create Copilot</Link>
                  </Button>
                </EmptyState>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardIndex;