import React, { Fragment, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import TypeConst from '../../../Enum/TypeConst'
import { fileUpload } from '../../../store/action/CommonRedux'
import { Loader } from '../../../components'
import { addCategory, updateCategory } from '../../../store/action/CategoryRedux'

function CategoryModalFooter(props) {
    const { onCloseModal, categoryId, subCatId } = props
    const { handleSubmit, reset } = useFormContext()
    const CommonReducer = useSelector((state) => state.common)
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.category.loading)
    const [categoryObj, setCategoryObj] = useState(null)

    const onClose = () => {
        reset()
        onCloseModal()
    }

    useEffect(() => {
        if (CommonReducer && CommonReducer?.file) {
            const obj = {
                ...categoryObj,
                image: CommonReducer?.file,
                parent_id: subCatId,
                categoryId: categoryId
            }
            if (categoryId) {
                dispatch(updateCategory(obj))
            } else {

                dispatch(addCategory(obj))
            }
        }
        return () => { }
    }, [CommonReducer])

    const uploadImage = (data) => {
        const formData = new FormData();
        formData.append('myfiles', data.category_image[0]);
        formData.append('type', TypeConst.Category);
        dispatch(fileUpload(formData))
    }

    const onSubmit = (data) => {
        setCategoryObj({
            name: data.category_name,
            image: "",
            parent_id: subCatId,
        })
        if (categoryId) {
            if (data.category_image) {
                uploadImage(data)
            } else {
                const obj = {
                    name: data.category_name,
                    categoryId: categoryId,
                    parent_id: subCatId,
                }
                dispatch(updateCategory(obj))
            }
        } else {
            uploadImage(data)
        }

    }
    return (
        <Fragment>
            {(loading || CommonReducer.loading) && <Loader />}
            <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Save changes</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
        </Fragment>
    )
}

export default CategoryModalFooter