import SignIn from '@/components/auth/SignIn'


const Page = ({ params }: { params: { lang: string } }) => {
  return <>

    <SignIn />
  </>
}

export default Page
