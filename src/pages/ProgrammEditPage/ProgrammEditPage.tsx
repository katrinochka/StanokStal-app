import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteProgramm,
    fetchProgramm,
    removeSelectedProgramm,
    updateProgramm,
    updateProgrammImage
} from "store/slices/programmsSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const ProgrammEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {programm} = useAppSelector((state) => state.programms)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(programm?.name)

    const [description, setDescription] = useState<string>(programm?.description)

    const [price, setPrice] = useState<number>(programm?.price)

    const [material, setMaterial] = useState<string>(programm?.material)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(programm?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const saveProgramm = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateProgrammImage({
                programm_id: programm.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            price,
            material
        }

        await dispatch(updateProgramm({
            programm_id: programm.id,
            data
        }))

        navigate("/programms-table/")
    }

    useEffect(() => {
        dispatch(fetchProgramm(id))
        return () => dispatch(removeSelectedProgramm())
    }, []);

    useEffect(() => {
        setName(programm?.name)
        setDescription(programm?.description)
        setPrice(programm?.price)
        setImgURL(programm?.image)
        setMaterial(programm?.material)
    }, [programm]);

    const handleDeleteProgramm = async () => {
        await dispatch(deleteProgramm(id))
        navigate("/programms-table/")
    }

    if (!programm) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput type="number" label="Цена" placeholder="Введите цену" value={price} setValue={setPrice}/>
                    <CustomInput type="text" label="Материал" placeholder="Введите материал" value={material} setValue={setMaterial}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveProgramm}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeleteProgramm}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default ProgrammEditPage