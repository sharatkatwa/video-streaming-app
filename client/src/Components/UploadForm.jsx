import './UploadForm.css'
import { toast, ToastContainer } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Line } from 'rc-progress'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const UploadForm = () => {
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)

  const handleUpload = (e) => {
    e.preventDefault()
    setShowProgress(true)
    sendApiRequest()
  }

  const sendApiRequest = async () => {
    try {
      const formData = new FormData()
      formData.append('video', selectedFile)
      formData.append('title', title)

      description ? formData.append('description', description) : null
      const res = await API.post('/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setUploadProgress(percentage)
        },
      })

      if (res.data.status === 'success') {
        console.log(res.data)
        notifySuccess()
        setTimeout(() => {
          navigate('/')
        }, 5000)
      }
    } catch (error) {
      console.log(error)
      notifyError()
    }
  }

  const displayFileName = (e) => {
    const videoFile = e.target.files[0]

    setSelectedFile(videoFile)
    console.log(videoFile.name)
  }

  const notifySuccess = () => {
    return toast.success('Video Uploaded Successfully', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }
  const notifyError = () => {
    return toast.error('Error Uploading Video! Please try again', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }
  return (
    <div className='upload-form-container'>
      <ToastContainer />
      <div className='main-heading-container'>
        <h1 className='main-heading'>Video Upload</h1>

        <div className='heading-box'></div>
      </div>
      <form>
        <div className='form-container'>
          <div className='input-div upload-div'>
            <label htmlFor='video-input' className='upload-label'>
              Select Video* <br />
              <FontAwesomeIcon icon={faUpload} size='3x' />
              <input
                type='file'
                accept='video/*'
                className='video-input'
                id='video-input'
                onChange={displayFileName}
              />
              <br />
              <span className='file-name' id='videoFileName'>
                {selectedFile?.name}
              </span>
            </label>
          </div>
          <div className='input-div'>
            <label>Title*</label>
            <input
              type='text'
              className='input input-title'
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='input-div'>
            <label>Description</label>
            <textarea
              className='input input-description'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className='submit-button' onClick={handleUpload}>
            Upload
          </button>
        </div>
        {showProgress && (
          <div>
            <Line
              percent={uploadProgress}
              strokeWidth='1'
              strokeColor='#ffffff'
            />
            <span>{uploadProgress}% uploaded</span>
          </div>
        )}
      </form>
    </div>
  )
}

export default UploadForm
