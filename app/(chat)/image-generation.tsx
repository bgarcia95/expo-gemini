import CustomInputBox from '@/components/chat/CustomInputBox';
import NoImages from '@/components/image-generation/NoImages';
import PreviousGenerationsGrid from '@/components/image-generation/PreviousGenerationsGrid';
import Slideshow from '@/components/image-generation/Slideshow';
import StyleSelector from '@/components/image-generation/StyleSelector';
import { useImagePlaygroundStore } from '@/store/image-playground/imagePlayground.store';
import { Layout, Spinner } from '@ui-kitten/components';
const placeHolderImages: string[] = [];

const ImageGenerationScreen = () => {

  const generatedImages = useImagePlaygroundStore(state => state.images);
  const imageHistory = useImagePlaygroundStore(state => state.history);
  const selectedStyle = useImagePlaygroundStore(state => state.selectedStyle);
  const isGenerating = useImagePlaygroundStore(state => state.isGenerating);
  const selectedImage = useImagePlaygroundStore(state => state.selectedImage);

  const { setSelectedStyle, generateImage, generateNextImage, setSelectedImage } = useImagePlaygroundStore();

  return (
    <Layout style={{ flex: 1 }}>


      {generatedImages.length === 0 && !isGenerating && <NoImages />}

      {generatedImages.length === 0 && isGenerating && (
        <Layout style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
        }}>
          <Spinner size='large' />
        </Layout>
      )}

      {generatedImages.length > 0 && <Slideshow
        images={generatedImages}
        isGenerating={isGenerating}
        onLastImage={generateNextImage}
      />}

      {/* Selector de estilos */}
      <StyleSelector selectedStyle={selectedStyle} onSelectStyle={setSelectedStyle} />

      <PreviousGenerationsGrid images={imageHistory} selectedImage={selectedImage} onSelectedImage={setSelectedImage} />

      <CustomInputBox onSendMessage={generateImage} />
    </Layout>
  );
};

export default ImageGenerationScreen;
