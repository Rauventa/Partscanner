import React from 'react';
import {Button} from "antd";
import {useHistory} from "react-router-dom";

export const Header = (props: any) => {

    const history = useHistory();

    const data = props.data;

  return (
      <div className={'heading'}>
          <h1>
              <span className={'fas fa-arrow-left'} onClick={history.goBack} />
              {data.heading}
          </h1>
          {data.buttons ?
              <div className="heading__buttons">
                  {data.buttons.map((button: any, index: any) => {
                      return (
                          button.type === 'primary' ?
                              <Button key={index} type={button.type}>
                                  {button.text}
                              </Button>
                              :
                              <Button key={index} className={button.type}>
                                  {button.text}
                              </Button>
                      )
                  })}
              </div> : null
          }
      </div>
  )
};