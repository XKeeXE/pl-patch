const UnityView = () => {
    return (
        <iframe
            className=" overflow-y-hidden"
            title={'L2DWP'}
            src={process.env.PUBLIC_URL + '/' + 'L2DWP/index.html'}
        />
    )
}

export default UnityView;