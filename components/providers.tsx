import { Analytics } from "@vercel/analytics/react"
import { Provider as TextBalancer } from "react-wrap-balancer"
import { Toaster } from "sonner"

interface Props {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <>
      <TextBalancer>{children}</TextBalancer>
      <Analytics debug={false} />
      <Toaster
        closeButton
        toastOptions={{
          className: "sonner-toast",
        }}
      />
    </>
  )
}

export default Providers
