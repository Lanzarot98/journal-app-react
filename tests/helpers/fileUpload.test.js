import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dbbnogl5k',
    api_key: '822635122936591',
    api_secret: 'gkJIxJNkj2w1tNDWmwQgCkaDt80',
    secure: true
})

describe('Testing fileUpload', () => { 
    
    test('should upload the file correctly to cloudinary', async() => { 
        
        const imageUrl = "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'photo.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        // console.log(url);
        const segments = url.split('/');
        // console.log(segments);
        const imageId = segments[ segments.length - 1 ].replace('.png', '');
        // console.log({imageId});

        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });
        console.log({ cloudResp });


    });

    test('should return null', async() => { 
        
        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file );
        expect( url ).toBe( null );
    });


});