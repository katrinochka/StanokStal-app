import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftManufacture,
    fetchManufacture,
    removeManufacture, sendDraftManufacture,
    triggerUpdateMM, updateManufacture
} from "store/slices/manufacturesSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_ManufactureStatus, T_Programm} from "modules/types.ts";
import ProgrammCard from "components/ProgrammCard/ProgrammCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";

const ManufacturePage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const manufacture = useAppSelector((state) => state.manufactures.manufacture)

    const [name, setName] = useState<string>(manufacture?.name)

    const [marriage, setMarriage] = useState<string>(manufacture?.marriage)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/403/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchManufacture(id))
        return () => dispatch(removeManufacture())
    }, []);

    useEffect(() => {
        setName(manufacture?.name)
        setMarriage(manufacture?.marriage)
    }, [manufacture]);

    const sendManufacture = async (e) => {
        e.preventDefault()

        await saveManufacture()

        await dispatch(sendDraftManufacture())

        navigate("/manufactures/")
    }

    const saveManufacture = async (e?) => {
        e?.preventDefault()

        const data = {
            name
        }

        await dispatch(updateManufacture(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteManufacture = async () => {
        await dispatch(deleteDraftManufacture())
        navigate("/programms/")
    }

    if (!manufacture) {
        return (
            <></>
        )
    }

    const isDraft = manufacture.status == E_ManufactureStatus.Draft
    const isCompleted = manufacture.status == E_ManufactureStatus.Completed

    return (
        <Form onSubmit={sendManufacture} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновая деталь" : `Деталь №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName} disabled={!isDraft || is_superuser}/>
                {isCompleted && <CustomInput label="Брак" value={marriage} disabled={true}/>}
            </Row>
            <Row>
                {manufacture.programms.length > 0 ? manufacture.programms.map((programm:T_Programm) => (
                    <Row key={programm.id} className="d-flex justify-content-center mb-5">
                        <ProgrammCard programm={programm} showRemoveBtn={isDraft} editMM={isDraft}/>
                    </Row>
                )) :
                    <h3 className="text-center">Программы не добавлены</h3>
                }
            </Row>
            {isDraft && !is_superuser &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="primary" className="fs-4" onClick={saveManufacture}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="primary" className="fs-4" onClick={deleteManufacture}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default ManufacturePage