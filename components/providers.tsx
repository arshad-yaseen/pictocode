import { Fragment } from "react"
import { Analytics } from "@vercel/analytics/react"
import { Provider as TextBalancer } from "react-wrap-balancer"
import { Toaster } from "sonner"

interface Props {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <Fragment>
      <TextBalancer>{children}</TextBalancer>
      <Analytics debug={false} />
      <Toaster
        closeButton
        toastOptions={{
          className: "sonner-toast",
        }}
      />
    </Fragment>
  )
}

export default Providers
