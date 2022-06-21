import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { HookFormInput } from '../Form';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { createStyles } from './CustomPasswordInput.style';

function CustomPasswordInput({ ...props }) {
  const Styles = useThemeAwareObject(createStyles);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <HookFormInput
        secureTextEntry={!showPassword}
        {...props}
        inputStyle={{ paddingRight: 48 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowPassword(!showPassword)}
          style={Styles.passWordVisibilityIconContainer}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size={24} />
        </TouchableOpacity>
      </HookFormInput>
    </View>
  );
}

export default CustomPasswordInput;
