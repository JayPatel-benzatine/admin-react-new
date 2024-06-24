import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FileUpload, InputBox } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../../store/action/CategoryRedux'

function CategoryModal(props) {
    const { categoryId } = props
    const { control, setValue, formState: { errors }, setError, clearErrors } = useFormContext()
    const [previewImage, setPreviewImage] = useState("");
    const dispatch = useDispatch()
    const categoryData = useSelector((state) => state.category.categoryData)

    useEffect(() => {
        if (categoryId) {
            dispatch(getCategory(categoryId))
        }
        return () => { }
    }, [categoryId])

    useEffect(() => {
        if (categoryData) {
            setValue('category_name', categoryData?.name)
            if (categoryData?.image) {
                setPreviewImage(categoryData?.image)
            }
        } else {
            setValue('category_name', '')
        }
        return () => { }
    }, [categoryData])



    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const isImage = files[0].type.startsWith('image/');
            if (isImage) {
                setValue('category_image', files);
                setPreviewImage(URL.createObjectURL(files[0]))
                clearErrors('category_image')
            } else {
                setError('category_image', { type: 'required' })
                setValue('category_image', null);
                setPreviewImage('')
            }
        }
    };

    return (
        <div>
            <InputBox
                control={control}
                label={"Category Name"}
                type={'text'}
                name={'category_name'}
                rules={{ required: true }}
                className={errors?.category_name ? 'error' : ''}
            />
            <FileUpload
                control={control}
                name={'category_image'}
                label={"Category Image"}
                rules={{ required: previewImage ? false : true }}
                className={errors?.category_image ? 'upload-error' : ''}
                handleFileChange={handleFileChange}
                previewImage={previewImage}
                accept={'image/*'}
            />
        </div>
    )
}

export default CategoryModal