// import {
//   Body,
//   Button,
//   Container,
//   Head,
//   Heading,
//   Hr,
//   Html,
//   Img,
//   Row,
//   Section,
//   Tailwind,
//   Text,
// } from "@react-email/components";

// interface ForgotPasswordEmailProps {
//   firstName: string;
//   link: string;
// }

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

// export const ForgotPasswordEmail = ({
//   firstName,
//   link,
// }: ForgotPasswordEmailProps) => (
//   <Html>
//     <Head />
//     <Tailwind>
//       <Body className="bg-gray-100 font-sans text-gray-600">
//         <Container className="bg-white shadow-sm my-6 max-w-5xl w-full">
//           <Img
//             src={`${baseUrl}/static/bloggy-banner.png`}
//             width="100%"
//             height="400px"
//             alt="Bloggy email banner"
//             className="object-cover object-center"
//           />
//           <Section className="p-6 text-[16px] leading-[23px]">
//             <Heading as="h2">Bonjour, {firstName}</Heading>
//             <Text>
//               Vous avez fait une demande de changement de mot de passe, cliquez
//               sur le lien pour le changer
//             </Text>

//             <div className="w-full my-6 flex justify-center items-center">
//               <Button
//                 href={link}
//                 className="w-fit rounded-md bg-gray-600 text-white flex items-center px-4 py-3"
//               >
//                 Changer mon mot de passe
//               </Button>
//             </div>
//             <Hr className="w-full" />
//             <Row>
//               <Text>
//                 Le lien de réinitialisation de votre mot de passe expire dans 10
//                 minutes.
//                 <br />
//                 Si le lien est expiré veuillez refaire une demande de changement
//                 de mot de passe.
//               </Text>
//             </Row>
//           </Section>
//         </Container>
//       </Body>
//     </Tailwind>
//   </Html>
// );

// export default ForgotPasswordEmail;
