// Our Agility Modules 
import RichTextArea from './components/modules/RichTextArea'
import PostsListing from './components/modules/PostListing'
import PostDetails from './components/modules/PostDetails'
import Jumbotron from './components/modules/Jumbotron'

// Our Agility PageTemplates 
import OneColumnTemplate from './components/templates/OneColumnTemplate'

export default {
    moduleComponents: {
        RichTextArea,
        PostsListing,
        Jumbotron,
        PostDetails
    },
    pageTemplateComponents: {
        OneColumnTemplate
    }
}