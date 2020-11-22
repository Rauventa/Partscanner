import React, {useState} from 'react';
import { Switch } from 'antd';
import lock from '../../../../assets/images/Table/locks/lock.png';
import unlock from '../../../../assets/images/Table/locks/unlock.png';

export const RangeListSwitcher = (props: any) => {

    const [locker, setLocker] = useState(true);

    const changeLocker = () => {
      setLocker(!locker)
    };

  return (
      locker ?
          <div className={'table-ison'}>
              <img
                  src={lock}
                  alt="lock"
                  onClick={changeLocker}
              />
              <Switch defaultChecked={props.value} disabled />
          </div>
          :
          <div className={'table-ison'}>
              <img
                  src={unlock}
                  alt="unlock"
                  onClick={changeLocker}
              />
              <Switch defaultChecked={props.value} />
          </div>
  )
};