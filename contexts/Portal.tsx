import React, {useState, useEffect} from "react";
import { createPortal } from "react-dom"

type Props = {
	id: string;
	children?: React.ReactNode;
}

const Portal: React.FC<Props> = (props: Props) => {
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
      setMounted(true)
      return () => setMounted(false)
   }, [])

	return mounted ? createPortal(props.children, document.querySelector(`#${props.id}`) as HTMLElement) : null
};

export default Portal;
