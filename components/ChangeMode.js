import { Button } from "react-native"

export default function ChangeMode({ ...prop }) {
    return (
        <Button title={prop.dark ? <FaMoon/> : <FiSun/>} onPress={prop.action}/>
    )
}