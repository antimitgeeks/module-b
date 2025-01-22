import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  // Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import Welcome from "../components/Welcome";
import APIServicess from '../services/APIServices';
import { useLocation } from 'react-router-dom';
import { trophyImage } from "../assets";
import { ProductsCard } from "../components"; 
import { useEffect, useState } from "react";
const APIServ = new APIServicess();


export default function HomePage() {
  const location = useLocation();
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [shopUrl, setShopUrl] = useState('');


  // Load data when the search query in the URL changes.
  useEffect(() => {
    console.log('location.search', location.search);
    
    getShopUrl();
  }, [location.search]);

  // Get shop URL from query parameters and handle related actions
  const getShopUrl = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const shopUrl = searchParams.get('shop');
      setShopUrl(shopUrl)
      if (!shopUrl) {
        console.warn('Shop parameter is missing from the URL');
        return;
      }
      // setShopUrl(shopUrl);
      await Promise.all([
        getPartnerInfo(shopUrl),
        languageListInfo(),
      ]);
    } catch (error) {
      console.error('Error retrieving shop URL:', error);
    }
  };
  const getPartnerInfo = async (shop) => {
   
      const resp = await APIServ.getPartnerInfoData();
      
      if(resp?.status && resp?.data){
        console.log("partner info---",resp);

        setWelcomeScreen(false)
      }

    
    }
  const { t, i18n } = useTranslation();
  

  const [languageList, setLanguageList] = useState([]);
  const languageListInfo = async () => {
    try {
      const reqBody = { limit: 10, offset: 0 };
      const resp = await APIServ.languageList(reqBody);
      console.log("language list---",resp);
      if (resp?.status) {
        setLanguageList(resp?.data);
      }
    } catch (error) {
      console.error('Error fetching language list:', error?.response || error);
    }
  };

  const createPartnerInfo = async (selected) => {
    try {
      const resp = await APIServ.createPartnerInfoData();
      if (resp?.status) {
        const data = { languageId: selected };
        // setWelcomeScreen(false)
        const languageresp = await APIServ.languageUpdate(data);
        if (languageresp?.status) {
          await getPartnerInfo(shopUrl);
          // await handleFillterStats(null, null, 'today');
          // setWelcomeScreen(false);

          const storeName = shopUrl.replace(".myshopify.com", "");
          const welcomeTitle = t("HomePage.welcomeText");
          let name = resp?.result?.shopJson?.name ? resp?.result?.shopJson?.name : storeName;
          // setWelcomeText(welcomeTitle.replace("`user`", `${name}!`));
        }
      }
    } catch (error) {
      // setLoader(false);
      console.error('Error creating partner info:', error?.response || error);
    } finally {
      // setLoader(false);
    }
  };
  // const { t } = useTranslation();
  return (

    <Page fullWidth>
      {
      welcomeScreen ? 
         <Welcome createPartnerInfo={createPartnerInfo} languageList={languageList}  /> 
      :
        <div style={{ width: "100%", margin: "auto", maxWidth: "950px" }}>Hello {shopUrl}</div>
}
    </Page>

    // <Page narrowWidth>
    //   <TitleBar title={t("HomePage.title")} />
    //   <Layout>
    //     <Layout.Section>
    //       <Card sectioned>
    //         <Stack
    //           wrap={false}
    //           spacing="extraTight"
    //           distribution="trailing"
    //           alignment="center"
    //         >
    //           <Stack.Item fill>
    //             <TextContainer spacing="loose">
    //               <Text as="h2" variant="headingMd">
    //                 {t("HomePage.heading")}
    //               </Text>
    //               <p>
    //                 <Trans
    //                   i18nKey="HomePage.yourAppIsReadyToExplore"
    //                   components={{
    //                     PolarisLink: (
    //                       <Link url="https://polaris.shopify.com/" external />
    //                     ),
    //                     AdminApiLink: (
    //                       <Link
    //                         url="https://shopify.dev/api/admin-graphql"
    //                         external
    //                       />
    //                     ),
    //                     AppBridgeLink: (
    //                       <Link
    //                         url="https://shopify.dev/apps/tools/app-bridge"
    //                         external
    //                       />
    //                     ),
    //                   }}
    //                 />
    //               </p>
    //               <p>{t("HomePage.startPopulatingYourApp")}</p>
    //               <p>
    //                 <Trans
    //                   i18nKey="HomePage.learnMore"
    //                   components={{
    //                     ShopifyTutorialLink: (
    //                       <Link
    //                         url="https://shopify.dev/apps/getting-started/add-functionality"
    //                         external
    //                       />
    //                     ),
    //                   }}
    //                 />
    //               </p>
    //             </TextContainer>
    //           </Stack.Item>
    //           <Stack.Item>
    //             <div style={{ padding: "0 20px" }}>
    //               <Image
    //                 source={trophyImage}
    //                 alt={t("HomePage.trophyAltText")}
    //                 width={120}
    //               />
    //             </div>
    //           </Stack.Item>
    //         </Stack>
    //       </Card>
    //     </Layout.Section>
    //     <Layout.Section>
    //       <ProductsCard />
    //     </Layout.Section>
    //   </Layout>
    // </Page>
  );
}




// import { InlineGrid, Box, Image, Text, List, Select, Button, Spinner } from '@shopify/polaris';
// import { useState, useEffect } from 'react';
// import { welcome, English, French, German, Spain, Italian } from "../assets";
// import { useTranslation } from "react-i18next";


// export default function Welcome({ createPartnerInfo, languageList, loader }) {
//     const { t, i18n } = useTranslation();
//     const [selected, setSelected] = useState('en');
//     const options = languageList && languageList.map((item) => ({
//         label: item.name,
//         value: item._id,
//         prefix: (
//             <Image
//                 source={item.key === 'en' ? English : ((item.key === 'fr') ? French : ((item.key === 'it') ?  Italian : ((item.key === 'es') ? Spain : German)))}
//                 alt={item.name}
//                 style={{ height: "16px" }}
//             />
//         ) 
//     }));

//     useEffect(() => {
//         // Set default language based on `default` flag in languageList
//         const defaultLanguage = languageList.find(item => item.default);
//         if (defaultLanguage) {
//             setSelected(defaultLanguage._id);
//         }
//     }, [languageList]);

//     // Handle language selection change
//     const handleLanguageChange = (value) => {
//         setSelected(value);
//         const selectedLanguage = languageList.find(lang => lang.key === value);
//         if (selectedLanguage) {
//             setSelected(selectedLanguage.name);
//         }
//     };

//     // Trigger the partner info creation with selected language
//     const getStartedAccountEditor = () => {
//         createPartnerInfo(selected);
//     };

//     return (
//         <div style={{ width: "100%", margin: "auto", maxWidth: "1000px" }}>
//             <InlineGrid columns={{ "xs": 1, "lg": 2 }}>
//                 <Box
//                     background="bg-surface"
//                     as={'div'}
//                     borderStartStartRadius="200"
//                     borderEndStartRadius="200"
//                     padding="400"
//                     shadow="200">
//                     <Box as={'div'} paddingBlock="200">
//                         <Text variant="headingLg" as="h2">{t("Welcome.welcomeText")}</Text>
//                     </Box>
//                     <Box as={'div'} paddingBlock="025">
//                         <Text variant="headingSm" as="p">{t("Welcome.welcomeSubtitle")}</Text>
//                     </Box>
//                     <Box as={'div'} paddingBlock="200">
//                         <Text variant="bodyMd" as="p" fontWeight="regular" tone="subdued">{t("Welcome.welcomeDesc")}</Text>
//                     </Box>
//                     <Box as={'div'} paddingBlock="100">
//                         <Text variant="headingSm" as="p" fontWeight="semibold">{t("Welcome.welcomeListTitle")}</Text>
//                     </Box>
//                     <Box as={'div'} paddingBlock="200">
//                         <List type="bullet">
//                             <List.Item>{t("Welcome.welcomeListItem1")}</List.Item>
//                             <List.Item>{t("Welcome.welcomeListItem2")}</List.Item>
//                             <List.Item>{t("Welcome.welcomeListItem3")}</List.Item>
//                             <List.Item>{t("Welcome.welcomeListItem4")}</List.Item>
//                         </List>
//                     </Box>
//                     <Box as={'div'} paddingBlock="050">
//                         <Text variant="headingSm" as="p">{t("Welcome.welcomeSubtitle2")}</Text>
//                     </Box>
//                     <Box as={'div'} paddingBlock="200">
//                         <Text variant="headingSm" as="p" fontWeight="regular" tone="subdued">{t("Welcome.welcomeDesc2")}</Text>
//                     </Box>
//                     <Box as={'div'} paddingBlock="200">
//                         <Text variant="headingSm" as="p">{t("Welcome.welcomeLangText")}</Text>
//                     </Box>
//                     <Box as={'div'} paddingBlock="200">
//                         <div className="ac-language-wrap">
//                             <Select
//                                 options={options}
//                                 onChange={handleLanguageChange}
//                                 value={selected}
//                             />
//                         </div>
//                     </Box>
//                 </Box>
//                 <Box as={'div'} shadow="200">
//                     <Image source={welcome} alt="welcome" style={{ height: "100%", width: "100%" }} />
//                 </Box>
//             </InlineGrid>
//             <InlineGrid columns={1}>
//                 <div style={{ width: "100%", margin: "auto", maxWidth: "1000px" }}>
//                     <Box as={'div'} paddingBlock="400">
//                         {
//                             !loader ? <Button variant="primary" onClick={getStartedAccountEditor}>{t("Welcome.welcomeButtonText")}</Button> : <Spinner size="small" />
//                         }
//                     </Box>
//                 </div>
//             </InlineGrid>
//         </div>
//     );
// }
