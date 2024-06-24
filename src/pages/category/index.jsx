import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getCategoryList, getSubCategoryList, setEmptyCatogery } from '../../store/action/CategoryRedux'
import "./category.css"
import { Edit2, Trash2, PlusCircle } from 'react-feather';
import { Breadcrumb, CustomModal, Loader } from '../../components';
import { FormProvider, useForm } from 'react-hook-form';
import CategoryModal from './components/CategoryModal';
import CategoryModalFooter from './components/CategoryModalFooter';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';

function Category() {
    const categoryData = useSelector((state) => state.category)
    const { categoryList, loading, categoryFlag, subCat } = categoryData
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [categoryId, setCategoryId] = useState(null)
    const [categoryListData, setCategoryListData] = useState(categoryList || [])
    const navigate = useNavigate()
    const location = useLocation()

    const [subCatId, setSubCatid] = useState(null)
    const [categoryName, setCategoryName] = useState("")

    const methods = useForm()
    const { reset } = methods

    const getSubCategory = (id) => {
        dispatch(getSubCategoryList(id))
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('subcatid')) {
            let subId = queryParams.get('subcatid')
            let catName = queryParams.get('catname')
            setSubCatid(subId)
            setCategoryName(catName)
            getSubCategory(subId)
        } else {
            setSubCatid(null)
            dispatch(getCategoryList())
        }
        return () => { }
    }, [location])

    useEffect(() => {
        if (categoryList) {
            setCategoryListData(categoryList)
        }
        return () => { }
    }, [categoryList])

    useEffect(() => {
        if (categoryFlag) {
            onCloseModal()
            if (subCatId) {
                getSubCategory(subCatId)
            } else {
                dispatch(getCategoryList())
            }
        }
        return () => { }
    }, [categoryFlag])

    const onCloseModal = () => {
        setOpenModal(false)
        setCategoryId(null)
        reset()
        dispatch(setEmptyCatogery())
    }

    const onDeleteCategory = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this category?",
            icon: "warning",
            buttons: true
        }).then(willDelete => {
            if (willDelete) {
                dispatch(deleteCategory(id))
            }
        });
    }

    return (
        <div>
            {loading && <Loader />}
            <Breadcrumb name={'category'} menuItem={[{ name: 'category' }, { name: 'list' }]} />
            <div className="row ">
                <div className="col-md-12 col-lg-12 col-xl-12">
                    <div className="card" >
                        <div className="card-header category-title">
                            <h4 className='text-capitalize'>{subCatId ? `${categoryName} Category` : ' Category'}</h4>
                            <button type="button" className="btn btn-primary" onClick={() => setOpenModal(true)} >
                                {subCatId ? 'Add Sub Category' : 'Add Category'}
                            </button>
                        </div>
                        <div className="card-body ">
                            <div className="table-responsive">
                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categoryListData && categoryListData?.length > 0 &&
                                            categoryListData.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.name}</td>
                                                        <td><div className='category_image'> <img src={item?.image} alt='category_image' /></div> </td>
                                                        <td>
                                                            <div className='action'>
                                                                <div title="Edit" className="tooltip-container" onClick={() => {
                                                                    setOpenModal(true)
                                                                    setCategoryId(item.id)
                                                                }}>
                                                                    <Edit2 />
                                                                </div>
                                                                <div title="Delete" className="tooltip-container" onClick={() => onDeleteCategory(item.id)}>
                                                                    <Trash2 />
                                                                </div>
                                                                {subCat && <div title="Sub Category" className="tooltip-container" onClick={() => {
                                                                    navigate(`/category/list?subcatid=${item.id}&catname=${item.name}&step`)
                                                                }}>
                                                                    <PlusCircle />
                                                                </div>}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                {subCatId && <button type="button" className="btn btn-primary float-right" onClick={() => navigate(-1)} >
                                    Back
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FormProvider {...methods}>
                <CustomModal
                    show={openModal}
                    closeModal={onCloseModal}
                    footerComponent={<CategoryModalFooter subCatId={subCatId || 0} categoryId={categoryId} onCloseModal={onCloseModal} />}
                    title={'Add Category'}
                    centered
                >
                    <CategoryModal categoryId={categoryId} />
                </CustomModal>
            </FormProvider>
        </div>
    )
}

export default Category