// Our Agility Modules
import RichTextArea from './components/modules/RichTextArea'
import PostsListing from './components/modules/PostListing'
import PostDetails from './components/modules/PostDetails'
import Jumbotron from './components/modules/Jumbotron'
import TestJumboTron from './components/modules/Jumbotron'
import ImageLink from './components/modules/ImageLink'
import ImageSlider from './components/modules/ImageSlider'
import FeaturedPosts from './components/modules/FeaturedPosts'

// Our Agility PageTemplates
import OneColumnTemplate from './components/templates/OneColumnTemplate'

export default {
    moduleComponents: {
        RichTextArea,
        PostsListing,
		Jumbotron,
		TestJumboTron,
		PostDetails,
		ImageLink,
		ImageSlider,
		FeaturedPosts

    },
    pageTemplateComponents: {
        OneColumnTemplate
    }
}