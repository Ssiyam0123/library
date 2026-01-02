import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Test() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-blue-500">
      <StyledText className="text-white text-xl">Hello NativeWind</StyledText>
    </StyledView>
  );
}
