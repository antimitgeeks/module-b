import { Card, Page, Layout, TextContainer, Text, InlineGrid, Box, Thumbnail, InlineStack, BlockStack, Icon, Button } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";



import APIServices from "../services/APIServices";
const APIServ = new APIServices();

export default function PageName() {
  const { t } = useTranslation();
  const [isFetched,setFetched]=useState(false);
  const handlePricingBannerAction = async () => {
    try {
      let resp = await APIServ.setupGuide();
      if (resp.status === true) {
        setFetched(true);
console.log(resp.message)        }
    } catch (error) {
      setFetched(false);      
      console.error('Error in handling pricing banner:', error?.response || error);
    }
  };

  if(true){
    return (
      <>
        <Page>
          <TitleBar title="Pick a plan that fits your needs" />
          <Box padding={400} >
            <Text variant="headingMd" as="h2">Pickup Plan</Text>
            <Box paddingBlock={200}>
            <Button disabled={isFetched}  onClick={handlePricingBannerAction}>Get Setup-Guide</Button>
            </Box>
  
          </Box>
  
          <InlineGrid gap="400" columns={3}>
            <Box padding={"400"} borderColor="border-emphasis-active" borderRadius="100" borderWidth="025" as="div" background="bg-fill">
              <InlineStack align='space-between'>
                <BlockStack inlineAlign="start" align="start">
  
                  <Text variant="headingLg" as="h2">Essential</Text>
                  <Text variant="bodyLg" as="h2">Best for :  Small businesses</Text>
  
  
                </BlockStack>
                <Thumbnail
                  source="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a1/02/b5/a102b544-6704-46ec-ceaf-7f1e4d3f5c43/AppIcon-1x_U007emarketing-0-10-0-0-GLES2_U002c0-85-220-0.png/246x0w.webp"
                  alt="Black choker necklace"
                /></InlineStack>
  
              <Text variant="headingLg" as="h2">
                Essential
              </Text>
              <Box padding={100}>
                <Text variant="headingMd" as="h2">
                  Key Features
                </Text>
              </Box>
  
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Order Modification Timeframes
                </Text>
              </Box>
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Basic editable components
                </Text>
              </Box>
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Order Cancellation
                </Text>
              </Box>
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Email support
                </Text>
              </Box>
            </Box>
            <Box padding={"400"} borderColor="border-emphasis-active" borderRadius="100" borderWidth="025" as="div" background="bg-fill">
              <InlineStack align='space-between'>
                <BlockStack inlineAlign="start" align="start">
                  <Text variant="headingLg" as="h2">Professional</Text>
                  <Text variant="bodyLg" as="h2">Best for :  Small businesses</Text>
                </BlockStack>
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                  alt="Black choker necklace"
                /></InlineStack>
  
              <Text variant="headingLg" as="h2">
                Professional
              </Text>
              <Box padding={100}>
                <Text variant="headingMd" as="h2">
                  Key Features
                </Text>
              </Box>
  
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Order Modification Timeframes
                </Text>
              </Box>
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Basic editable components
                </Text>
              </Box>
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Order Cancellation
                </Text>
              </Box>
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Email support
                </Text>
              </Box>
  
  
  
  
  
            </Box>
            <Box padding={"400"} borderColor="border-emphasis-active" borderRadius="100" borderWidth="025" as="div" background="bg-fill">
              <InlineStack align='space-between'>
                <BlockStack inlineAlign="start" align="start">
  
                  <Text variant="headingLg" as="h2">Free</Text>
                  <Text variant="bodyLg" as="h2">Best for :  Small businesses</Text>
  
  
                </BlockStack>
                <Thumbnail
                  source="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/14/42/e2/1442e296-6235-5123-f1ab-96be74fefe11/AppIcon-1x_U007emarketing-0-7-0-85-220.png/246x0w.webp"
                  alt="Black choker necklace"
                /></InlineStack>
  
              <Text variant="headingLg" as="h2">
                FREE
              </Text>
              <Box padding={100}>
                <Text variant="headingMd" as="h2">
                  Key Features
                </Text>
              </Box>
  
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Order Modification Timeframes
                </Text>
              </Box>
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Basic editable components
                </Text>
              </Box>
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Order Cancellation
                </Text>
              </Box>
              <Box padding={100}>
                <Text variant="bodySm" as="div">
                  Email support
                </Text>
              </Box>
  
  
  
  
  
            </Box>
          </InlineGrid>
        </Page>
      </>
    );
  }



 
  else{
    return (
      <>
      <ui-modal id="my-modal">
  <p>Message</p>
  <ui-title-bar title="Title">
    <button variant="primary">Label</button>
    <button onclick="document.getElementById('my-modal').hide()">Label</button>
  </ui-title-bar>
</ui-modal>

<button onclick="document.getElementById('my-modal').show()">Open Modal</button>
</>
    )
  }

  
}
