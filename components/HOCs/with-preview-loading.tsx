import { LoadingIcon } from "~/components/loading-icon"
import { PreviewProps } from "~/components/run/preview"

export const withPreviewLoading = (Component: React.FC<PreviewProps>) => {
  const WrappedComponent = (props: any) => {
    const { code, loadingText, isRunning, technology_id } =
      props as PreviewProps

    // If loading, show a loading icon
    if (isRunning && !code) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingIcon className="mr-2 h-4 w-4" loading={true} />
          {loadingText}
        </div>
      )
    }

    // If React is selected, show a message to wait for a while
    if (
      (technology_id === "react-tailwind" ||
        technology_id === "react-bootstrap") &&
      isRunning &&
      code
    ) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          You&apos;ve chosen React; please wait a while for the preview.
        </div>
      )
    }

    return <Component {...props} />
  }

  WrappedComponent.displayName = `WithPreviewLoading(${
    Component.displayName || Component.name || "Component"
  })`

  return WrappedComponent
}
