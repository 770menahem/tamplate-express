# Merges API

API service for Merger DB.
Have 2 request type:

-   GET. Pulls the documents by the given parameters and sends to the client.
-   RECOVERY. Pulls the documents by the given parameters and sends them to the selector queue.

## routes (for both request types)

-   / - Pulls all the documents.
-   /entity/:identifier - Pulls a document with the given identifier.
-   /source/:source - Pulls all the documents the contains the given source.
-   /source/:source/digitalIdentity/:digitalIdentityUniqueId - Pulls a document with the given digital identity from the given source.
-   /date/:dateMS - Pulls all the documents that has been updated since the given date.
