type MaterialIconProps = {
	name: string,
	className?: string
}

const MaterialIcon = ({ name, className }: Readonly<MaterialIconProps>) => {
	return (
		<span className={`material-symbols-outlined ${className}`}>{name}</span>
	)
}

export default MaterialIcon