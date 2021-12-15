const FileUploader = () => {
    return (
        <>
        <div className="p-4 items-center flex flex-row space-x-3 rounded-lg" style={{ background: "#010C4B0D" }}>
            <img className="ratio ratio-1x1" src="Vector.png"></img>

            <input className="file grow hidden" type="file" id="files" class="hidden" multiple />
            <label for="files" style={{ color: "#5F75EE" }}>Browse</label>
        </div>
        </>
    )
}

export default FileUploader
