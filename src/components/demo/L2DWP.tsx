const UnityView = () => {
    return (
        <iframe
            className=" overflow-hidden h-full md:w-[44%] md:h-[70%]"
            title={'L2DWP'}
            src={`${process.env.PUBLIC_URL}/L2DWP/index.html`}
        />
    )
}

export default UnityView;