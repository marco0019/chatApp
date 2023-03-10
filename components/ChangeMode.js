import { TouchableOpacity } from "react-native"
import { FaMoon } from 'react-icons/fa'
import { FiSun } from 'react-icons/fa'

export default function ChangeMode({ theme, action }) {
    return (
        <TouchableOpacity onPress={action}>
            {theme ? <FaMoon /> : <FiSun />}
        </TouchableOpacity>
    )
}