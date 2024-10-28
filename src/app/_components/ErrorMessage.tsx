import Button from "@/app/_components/base/Button";
import MaterialIcon from "@/app/_components/MaterialIcon";

interface ErrorMessageProps {
	errorMessage: string,
	onButtonClick: () => void,
	buttonIconName: string,
	buttonLabel: string
}

const ErrorMessage = ({errorMessage, onButtonClick, buttonLabel, buttonIconName}: Readonly<ErrorMessageProps>) => {
  return (
	  <div className={'flex flex-col items-center space-y-2'}>
		  <h4 className={"text-center w-full " +
			  "sm:w-1/2"}>{errorMessage}</h4>
		  <Button onClick={onButtonClick}>
			  <MaterialIcon name={buttonIconName} className={"transform"}/>
			  <p>{buttonLabel}</p>
		  </Button>
	  </div>
  )
}

export default ErrorMessage