import CustomButton from '@/components/CustomButton'
import { icons } from '@/constants'
import React from 'react'
import { Image, Text, View } from 'react-native'

const OAuth = () => {
    const handlegoogleSignIn=async()=>{
        
    }
  return (
    <View>
      <View
      className='flex flex-ro justify-center items-center mt-4 gap-x-3'
      >
        <View className='flex-1 h-[1px] bg-general-100'/>
        <Text className='flex-lg'>Or</Text>
        <View className='flex-1 h-[1px] bg-general-100'/>

        <CustomButton
        title='Log in with Google'
        className='mt-5 w-full shadow-none'
        IconLeft={()=>(
            <Image
            source={icons.google}
            resizeMode='contain'
            className='w-5 h-5 mx-2'
            />
        )}
        bgVariant='outline'
        textVariant='primary'
        onPress={handlegoogleSignIn}
        />

      </View>
    </View>
  )
}

export default OAuth

