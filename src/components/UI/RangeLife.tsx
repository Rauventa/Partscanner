import React, {useState} from 'react';
import {InputNumber, Radio, Select, Switch} from "antd";
import {CSSTransition, SwitchTransition, Transition} from "react-transition-group";

export const RangeLife = (props: any) => {

    const [valid, setValid] = useState(false);
    const [radio, setRadio] = useState(1);
    const [counter, setCounter] = useState(1);

    const { Option } = Select;

  return (
      <div className="RangeLife">
          <p className={'input-label'}>
              Срок годности ассортимента
          </p>

          <div className="RangeLife__content">
              <div className="RangeLife__content_checker">
                  <Switch defaultChecked={valid} onChange={() => setValid(!valid)} />
                  <p>Срок годности ассортимента</p>
              </div>

              <CSSTransition
                  in={valid}
                  timeout={500}
                  classNames={'lifeTransition'}
              >
                  <>
                      {valid ?
                          <div className={'RangeLife__content_data'}>
                              <Radio.Group onChange={event => setRadio(event.target.value)} value={radio}>
                                  <Radio value={1}>день</Radio>
                                  <Radio value={2}>неделя</Radio>
                                  <Radio value={3}>месяц</Radio>
                              </Radio.Group>
                              <div className={'RangeLife__content_data-time'}>
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
                              <div className={'RangeLife__content_data-info'}>
                                  <div className="RangeLife__content_data-info--date">
                                      <p className={'small-input-label'}>
                                          Будет повторяться каждую неделю в следующие дни:
                                          <br/>
                                          пн, ср, пт, вс
                                      </p>
                                  </div>
                                  <div className="RangeLife__content_data-info--time">
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
                  </>
              </CSSTransition>

          </div>
      </div>
  )
};