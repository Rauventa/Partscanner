import React, {useState} from 'react';
import {Input, Button} from "antd";
import {useHistory} from "react-router-dom";
import {RangeLife} from "../../../UI/RangeLife";

export const RangeAdd = (props: any) => {

    const [persons, setPersons] = useState([
        {
            id: '1',
            name: '',
            phone: '',
            email: ''
        }
    ]);

    const [supplier, setSupplier] = useState('');
    const [address, setAddress] = useState('');
    const [site, setSite] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const history = useHistory();

    const { TextArea } = Input;

    const addHandler = () => {
        const newPersons = [...persons];

        //letter generator (while backend not working)

        const abc = "abcdefghijklmnopqrstuvwxyz";
        let rs = "";
        while (rs.length < 6) {
            rs += abc[Math.floor(Math.random() * abc.length)];
        }

        //end generator

        newPersons.push({
            id: rs,
            name: '',
            phone: '',
            email: ''
        });

        setPersons(newPersons);
    };

    const deleteHandler = (id: any) => {
        const newPersons = [...persons];

        const filtered = newPersons.filter(item => item.id !== id);

        setPersons(filtered)
    };

    const changeName = (e: any, id: any, index: any) => {
        const newPersons = [...persons];

        const filtered = newPersons.filter(item => item.id === id);

        const res = Object.entries(filtered).map((item, index) => {
            return {
                ...item[1],
                name: e,
            }
        });

        newPersons.splice(
            index,
            1,
            res[0]
        );

        setPersons(newPersons);
    };

    const changePhone = (e: any, id: any, index: any) => {
        const newPersons = [...persons];

        const filtered = newPersons.filter(item => item.id === id);

        const res = Object.entries(filtered).map((item, index) => {
            return {
                ...item[1],
                phone: e,
            }
        });

        newPersons.splice(
            index,
            1,
            res[0]
        );

        setPersons(newPersons);
    };

    const changeEmail = (e: any, id: any, index: any) => {
        const newPersons = [...persons];

        const filtered = newPersons.filter(item => item.id === id);

        const res = Object.entries(filtered).map((item, index) => {
            return {
                ...item[1],
                email: e,
            }
        });

        newPersons.splice(
            index,
            1,
            res[0]
        );

        setPersons(newPersons);
    };

    const resetHandler = () => {
        setSupplier('');
        setAddress('');
        setPhone('');
        setEmail('');
        setSite('');
        setComment('');

        setPersons([
            {
                id: '1',
                name: '',
                phone: '',
                email: ''
            }
        ])
    };

    return (
        <div className={'RangeAdd'}>

            <div className="RangeAdd__heading">
                <h1>
                    <span className={'fas fa-arrow-left'} onClick={history.goBack} />
                    Создание поставщика
                </h1>
            </div>

            <div className="RangeAdd__name">
                <p className={'input-label'}>
                    Название поставщика
                </p>
                <Input placeholder="Название" value={supplier} onChange={e => setSupplier(e.target.value)} />
            </div>

            <div className="RangeAdd__row">
                <div className="RangeAdd__column">
                    <div className="RangeAdd__data">
                        <p className={'input-label'}>
                            Общая информация
                        </p>
                        <div className="RangeAdd__data_content">
                            <div className="RangeAdd__data_content-address">
                                <p className={'input-label'}>
                                    Адрес
                                </p>
                                <Input placeholder="Введите адрес" value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                            <div className="RangeAdd__data_content-site">
                                <p className={'input-label'}>
                                    Сайт
                                </p>
                                <Input placeholder="Введите адрес сайта" value={site} onChange={e => setSite(e.target.value)} />
                            </div>
                            <div className="RangeAdd__data_content-main">
                                <div className="RangeAdd__data_content-main--phone">
                                    <p className={'input-label'}>
                                        Телефон
                                    </p>
                                    <Input placeholder="Введите номер телефона" value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                                <div className="RangeAdd__data_content-main--email">
                                    <p className={'input-label'}>
                                        E-mail
                                    </p>
                                    <Input placeholder="Введите ваш E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="RangeAdd__persons">
                        <p className={'input-label'}>
                            Контактные лица
                        </p>
                        {persons.map((person, index) => {
                            return (
                                <div
                                    className="RangeAdd__persons_content"
                                    //@ts-ignore
                                    key={index+person}
                                >
                                    <div className="person">
                                        <div className="person__heading">
                                            <p>Контактное лицо {index + 1}</p>
                                            <i className={'fas fa-times'} onClick={() => deleteHandler(person.id)}/>
                                        </div>
                                        <div className="person__data">
                                            <div className="person__data_name">
                                                <p className={'input-label'}>
                                                    Имя
                                                </p>
                                                <Input placeholder="Введите имя" value={person.name} onChange={(e) => changeName(e.target.value, person.id, index)} />
                                            </div>
                                            <div className="person__data_phone">
                                                <p className={'input-label'}>
                                                    Телефон
                                                </p>
                                                <Input placeholder="Введите телефон" value={person.phone} onChange={(e) => changePhone(e.target.value, person.id, index)} />
                                            </div>
                                        </div>
                                        <div className="person__email">
                                            <p className={'input-label'}>
                                                E-mail
                                            </p>
                                            <Input placeholder="Введите email" value={person.email} onChange={(e) => changeEmail(e.target.value, person.id, index)} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="RangeAdd__persons_new">
                            <p>Контактное лицо {persons.length + 1}</p>
                            <Button type={'primary'} onClick={addHandler}>
                                <i className="fas fa-plus"/>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="RangeAdd__column">
                    <div className="RangeAdd__life">
                        <RangeLife />
                    </div>
                    <div className="RangeAdd__comment">
                        <p className={'input-label'}>
                            Комментарий
                        </p>
                        <TextArea rows={5} value={comment} onChange={e => setComment(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="RangeAdd__footer">
                <Button className={'btn-grey-light'} onClick={resetHandler}>Сбросить данные</Button>

                <div className="RangeAdd__footer_buttons">
                    <Button className={'ant-btn-secondary'}>Отменить</Button>
                    <Button type={'primary'}>Сохранить</Button>
                </div>
            </div>
        </div>
    )
};