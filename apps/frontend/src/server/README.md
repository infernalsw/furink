# `/server`

This folder contains dedicated server code that should not be accessible on the client.

I'm not sure if the Next compiler can guarantee that the contents of this folder are not included in
the client bundle, so it's still best to avoid putting any sensitive information in here.
