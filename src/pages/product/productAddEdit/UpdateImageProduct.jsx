import React, { Fragment, useEffect, useState } from 'react'
import { FileUpload } from '../../../components';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteProductImageById } from '../../../store/action/ProductRedux';

function UpdateImageProduct(props) {
    const { name, preImage, imageId, setImageArray, imageArray } = props
    // const productReducer = useSelector((state) => state.product)
    // const { deleteProductImage } = productReducer
    const { control, setValue, clearErrors } = useFormContext()
    const [removeImageFlag, setRemoveImageFlag] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (preImage) {
            setImageArray(prevArray => [...prevArray, preImage]);
        }
        return () => { }
    }, [preImage])

    // useEffect(() => {
    //     if (deleteProductImage) {
    //         setRemoveImageFlag(true)
    //         let newArray = imageArray.slice(0, -1);
    //         setImageArray(newArray)
    //     }

    //     return () => { }
    // }, [deleteProductImage])

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const isImage = files[0].type.startsWith('image/');
            if (isImage) {
                setValue(name, files[0]);
                setPreviewImage(URL.createObjectURL(files[0]))
                setImageArray([...imageArray, URL.createObjectURL(files[0])])
                clearErrors(name)
            } else {
                setValue(name, null);
                setPreviewImage('')
            }
        }
    }

    return (
        <Fragment>
            {
                previewImage ?
                    <FileUpload
                        control={control}
                        name={name}
                        className={`new-image`}
                        handleFileChange={(e) => handleFileChange(e)}
                        previewImage={previewImage}
                        accept={'image/*'}
                    />
                    :
                    <FileUpload
                        control={control}
                        name={name}
                        className={`new-image`}
                        handleFileChange={(e) => handleFileChange(e)}
                        previewImage={removeImageFlag ? previewImage : preImage}
                        accept={'image/*'}
                        removeImage={(id) => {
                            dispatch(deleteProductImageById(id))
                            setRemoveImageFlag(true)
                            let newArray = imageArray.slice(0, -1);
                            setImageArray(newArray)
                        }}
                        imageId={removeImageFlag ? "" : imageId}
                    />
            }

        </Fragment>
    )
}

export default UpdateImageProduct