import React, {useState} from 'react';
import {Select, Switch, Radio, InputNumber, Upload, message} from 'antd';
import {moqArray} from "../../moq/moq";
import cloud from '../../assets/images/cloud.svg'

export const Range = () => {

    const [title, setTitle] = useState('Europarts');
    const [valid, setValid] = useState(false);
    const [radio, setRadio] = useState(1);
    const [counter, setCounter] = useState(1);

    const { Option } = Select;
    const { Dragger } = Upload;

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //@ts-ignore
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className="Range">

            <div className="Range__heading">
                <h1>Ассортимент поставщика</h1>
            </div>

            {moqArray.filter(item => item.supplier === title).map(item => {
                return (
                    //@ts-ignore
                    <React.Fragment key={item}>
                        <div className="Range__supplier">

                            <p className={'input-label'}>
                                Поставщик
                            </p>

                            <Select defaultValue="Europarts" onChange={value => setTitle(value)}>
                                <Option value="Europarts">Europarts</Option>
                                <Option value="Armatek">Armatek</Option>
                                <Option value="Hub">Hub</Option>
                            </Select>
                        </div>

                        <div className="Range__info">

                            <div className="Range__info_heading">
                                <h1>
                                    {item.supplier}
                                    <span className="far fa-edit"/>
                                </h1>
                            </div>

                            <div className="Range__info_list">
                                <div className="Range__info_list-field">
                                    <p className={'list-title'}>
                                        Адрес
                                    </p>
                                    <p className={'list-value'}>
                                        {item.address}
                                    </p>
                                </div>
                                <div className="Range__info_list-field">
                                    <p className={'list-title'}>
                                        Контактное лицо
                                    </p>
                                    <p className={'list-value'}>
                                        {item.person}
                                    </p>
                                </div>
                                <div className="Range__info_list-field">
                                    <p className={'list-title'}>
                                        Телефон
                                    </p>
                                    <p className={'list-value'}>
                                        {item.phone}
                                    </p>
                                </div>
                                <div className="Range__info_list-field">
                                    <p className={'list-title'}>
                                        E-mail
                                    </p>
                                    <p className={'list-value'}>
                                        {item.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="Range__stock">
                            <div className="Range__stock_heading">
                                <h1>Ассортимент</h1>
                            </div>

                            <div className="Range__stock_type">
                                <p className={'input-label'}>
                                    Тип данных
                                </p>
                                <p>{item.dataType}</p>
                            </div>

                            <div className="Range__stock_content">
                                <div className="Range__stock_content-files">
                                    <p className={'input-label'}>
                                        Загрузка файлов ассортимента
                                    </p>

                                    <Dragger {...props}>
                                        <p className="ant-upload-drag-icon">
                                            <img src={cloud} alt=""/>
                                        </p>
                                        <h2>Загрузите прайс-листы поставщика</h2>
                                        <p className="ant-upload-text">Выберите или перетащите файлы на вашем компьютере</p>
                                        <p className="ant-upload-hint">
                                            Файлы в формате: xlsx, csv
                                        </p>
                                    </Dragger>
                                </div>
                                <div className="Range__stock_content-valid">
                                    <p className={'input-label'}>
                                        Срок годности ассортимента
                                    </p>

                                    <div className="validContent">
                                        <div className="validContent__checker">
                                            <Switch defaultChecked={valid} onChange={() => setValid(!valid)} />
                                            <p>Срок годности ассортимента</p>
                                        </div>

                                        {valid ?
                                            <div className={'validContent__content'}>
                                                <Radio.Group onChange={event => setRadio(event.target.value)} value={radio}>
                                                    <Radio value={1}>день</Radio>
                                                    <Radio value={2}>неделя</Radio>
                                                    <Radio value={3}>месяц</Radio>
                                                </Radio.Group>
                                                <div className={'validContent__content_time'}>
                                                    {counter > 1 ?
                                                        <>
                                                            <button onClick={() => setCounter(counter - 1)}>-</button>
                                                            <InputNumber
                                                                value={counter}
                                                                //@ts-ignore
                                                                onChange={value => setCounter(value)}
                                                            />
                                                            <button onClick={() => setCounter(counter + 1)}>+</button>
                                                        </> :
                                                        <>
                                                            <button disabled>-</button>
                                                            <InputNumber
                                                                value={counter}
                                                                //@ts-ignore
                                                                onChange={value => setCounter(value)}
                                                            />
                                                            <button onClick={() => setCounter(counter + 1)}>+</button>
                                                        </>
                                                    }
                                                    <Select defaultValue="lucy">
                                                        <Option value="jack">Jack</Option>
                                                        <Option value="lucy">Lucy</Option>
                                                        <Option value="Yiminghe">yiminghe</Option>
                                                    </Select>

                                                    <Select defaultValue="lucy">
                                                        <Option value="jack">Jack</Option>
                                                        <Option value="lucy">Lucy</Option>
                                                        <Option value="Yiminghe">yiminghe</Option>
                                                    </Select>
                                                </div>
                                                <div className={'validContent__content_info'}>
                                                    <div className="validContent__content_info-date">
                                                        <p className={'small-input-label'}>
                                                            Будет повторяться каждую неделю в следующие дни:
                                                            <br/>
                                                            пн, ср, пт, вс
                                                        </p>
                                                    </div>
                                                    <div className="validContent__content_info-time">
                                                        <p>до 11 мая 2020</p>
                                                        <h2>
                                                            <span>1</span> д
                                                            <span> 16</span> ч
                                                            <span> 36</span> м
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="Range__stock_statistic">
                                <div className="Range__stock_statistic-heading">
                                    <h3 className={'post-title'}>
                                        Статистика ассортимента
                                    </h3>
                                </div>

                                <div className="Range__stock_statistic-list">
                                    <div className="Range__stock_statistic-list--item">
                                        <p className={'small-input-label'}>Дата установки</p>
                                        <p>{item.date}</p>
                                    </div>
                                    <div className="Range__stock_statistic-list--item">
                                        <p className={'small-input-label'}>Файлов</p>
                                        <p>{item.files}</p>
                                    </div>
                                    <div className="Range__stock_statistic-list--item">
                                        <p className={'small-input-label'}>Всего позиций</p>
                                        <p>{item.positions}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="Range__files">

                        </div>
                    </React.Fragment>
                )
            })}
        </div>
    )
};