const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:"**"
            }
        ]
    },
    env: {
        Image_Upload_Token:process.env.Image_Upload_Token
      }
}

module.exports = nextConfig