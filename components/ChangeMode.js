import { Button } from "react-native"
import { FaMoon, FaSun } from 'react-icons/fa'
import { FiSun } from 'react-icons/fi'
export default function ChangeMode({ ...prop }) {
    return (
        <Button title={prop.dark ? <FaMoon/> : <FiSun/>} onPress={prop.action}/>
    )
}