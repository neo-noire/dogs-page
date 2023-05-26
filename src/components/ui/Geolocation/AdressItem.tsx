import {FC }from 'react'
import { ILocation } from '../../../types/types';

interface IAdresItemProps {
    adressList: ILocation[],
    setTextInput: (a:string) => void,
    setShowInput: (b: boolean) => void,
}
export const AdressItem:FC<IAdresItemProps> = ({adressList, setTextInput, setShowInput}) => {

    const dropdownListHandler = (city:string,state:string, zip_code:string):void => {
        setTextInput(`${city},${state},${zip_code}`);
                    setShowInput(false);
      }
  return (
    <ul>
    {adressList.map((el) => (
      <li
        key={el.zip_code}
        onClick={() => dropdownListHandler(el.city,el.state,el.zip_code)}
      >
        {el.city}, {el.state},{el.county} county, ZIP:{el.zip_code}
      </li>
    ))}
  </ul>
  )
}
