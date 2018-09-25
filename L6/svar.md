# QUESTIONS
## Vad är PKI?
Public Key Infrastructure, a system to create, store and distribute certificates(like virtual ID-cards).

A certificate is a signed message used to control if a public key belongs to a specific entiy.

## Vad löser PKI för problem?
Authentication

Interception

Data Integrity

Certificates

Encryption

Hash

## Vad innehåller ett certifikat? Förklara alla fält.
Version:
This field describes the version of the encoded certificate.  For SSL certificates, the X.509 version is 3 since certificate extensions are used.

Serial Number:
The Serial Number is a positive integer assigned by Symantec to each SSL certificate.  It is unique for each certificate issued by Symantec (i.e., the issuer name and serial number identify a unique certificate).

Signature Algorithm:
The Signature Algorithm identifies the cryptographic algorithm used by Symantec to sign this certificate.  As of 2016, Symantec signs all SSL certificates using the SHA-2 Algorithm.

Issuer:
The Issuer field identifies the entity who has signed and issued the certificate.  For SSL certificates, this would contain the the Distinguished Name (DN) information for the Intermediate CA Certificate.

Valid From and Valid To:
These fields indicate the validity period of the SSL certificate.

Subject:
This contains the Distinguished Name (DN) information for the certificate.  The fields included in a typical SSL certificate are:

Common Name (CN)
Organization (O)
Organizational Unit (OU)
Locality or City (L)
State or Province (S)
Country Name (C)

For Extended Validation (EV) SSL certificates, these additional fields are also included:

Company Street Address
Postal Code
Business Category
Serial Number (Business Registration Number)
Jurisdiction State
Jurisdiction Locality

Public Key:
This field is used to identify the algorithm with which the SSL certificate is used.  It also contains the byte-array information for the certificate.

Subject Alternative Name (SAN):
The Subject Alternative Name extension allows additional identities to be bound to the subject of the certificate. The DNS name (dNSName) extension is used to add an additional fully qualified domain name to a SSL certificate.

Basic Constraints:
This extension indicates whether a certificate is a Certificate Authority (CA) or not.  If the certificate is a CA, then additional information, such as the depth of the hierarchy it can sign, is specified. SSL certificates are end-entity certificates, not CA certificates.

Subject Key Identifier (SKI):
The Subject Key Identifier extension provides a means of identifying certificates that contain a particular public key.  This is a hash value of the SSL certificate.

Key Usage:
The Key Usage extensions define what a particular certificate may be used for (assuming the application can parse this extension).  The following extensions are included in an SSL certificate:

Digital Signature: The digitalSignature bit is asserted when the subject public key is used with a digital signature mechanism to support security services other than certificate signing (bit 5), or CRL signing (bit 6). Digital signature mechanisms are often used for entity authentication and data origin authentication with integrity.

Key Encipherment: The keyEncipherment bit is asserted when the subject public key is used for key transport. An example of Key Encipherment is the SSL handshake, where the two applications use asymmetric encryption to wrap around the exchange of a secret key that is ultimately used for the session.

CRL Distribution Points:
The CRL Distribution Points extension provides the location of the corresponding Certificate Revocation List (CRL) for the SSL certificate.

Certificate Policies:
The Certificate Policies extension defines the legal rules associated with a particular certificate’s usage. 

Extended Key Usage (EKU):
This extension indicates one or more purposes for which the certified public key may be used, in addition to or in place of the basic purposes already indicated in the key usage extension.  Symantec SSL Certificates include the following extensions:

Server Authentication: TLS WWW server authentication. Key usage bits that may be consistent: digitalSignature, keyEncipherment or keyAgreement

Client Authentication: TLS WWW client authentication. Key usage bits that may be consistent: digitalSignature and/or keyAgreement

Symantec Secure Site Pro  (Premium) SSL certificates also have the following extension: 2.16.840.1.113730.4.1 - Netscape Server Gated Crypto (nsSGC)

Authority Key Identifier (AKI):
The Authority Key Identifier extension provides the key identifier of the Issuing CA certificate that signed the SSL certificate.  This AKI value would match the SKI value of the Intermediate CA certificate.

Authority Info Access: 
The Authority Info Access extension provides information about how to access information about a CA, such as OCSP validation and CA policy data.

Logotype:
The Logotype extension is a logotype representing the organization identified as part of the issuer name in the certificate.

Thumbprint Algorithm: 
This extension indicates the algorithm used to hash the certificate.

Thumbprint:
This extension provides the actual hash to ensure that the certificate has not been tampered with.



## Hur valideras ett certifikat? Vilka algoritmer används på vilka fält och i vilken ordning?

## Hur levereras root-certifikaten till din dator?

## Vad är en trust chain?
A certificate chain is an ordered list of certificates, containing an SSL Certificate and Certificate Authority (CA) Certificates, that enable the receiver to verify that the sender and all CA's are trustworthy. The chain or path begins with the SSL certificate, and each certificate in the chain is signed by the entity identified by the next certificate in the chain.

Any certificate that sits between the SSL Certificate and the Root Certificate is called a chain or Intermediate Certificate. The Intermediate Certificate is the signer/issuer of the SSL  Certificate. The Root CA Certificate is the signer/issuer of the Intermediate Certificate. If the Intermediate Certificate is not installed on the server (where the SSL certificate is installed) it may prevent some browsers, mobile devices, applications, etc. from trusting the SSL certificate. In order to make the SSL certificate compatible with all clients, it is necessary that the Intermediate Certificate be installed.

The chain terminates with a Root CA Certificate. The Root CA Certificate is always signed by the CA itself. The signatures of all certificates in the chain must be verified up to the Root CA Certificate.

------------------------------

A chain of trust is designed to allow multiple users to create and use software on the system, which would be more difficult if all the keys were stored directly in hardware. It starts with hardware that will only boot from software that is digitally signed. The signing authority will only sign boot programs that enforce security, such as only running programs that are themselves signed, or only allowing signed code to have access to certain features of the machine. This process may continue for several layers.

This process results in a chain of trust. The final software can be trusted to have certain properties, because if it had been illegally modified its signature would be invalid, and the previous software would not have executed it. The previous software can be trusted, because it, in turn, would not have been loaded if its signature had been invalid. The trustworthiness of each layer is guaranteed by the one before, back to the trust anchor.

It would be possible to have the hardware check the suitability (signature) for every single piece of software. However, this would not produce the flexibility that a "chain" provides. In a chain, any given link can be replaced with a different version to provide different properties, without having to go all the way back to the trust anchor. This use of multiple layers is an application of a general technique to improve scalability, and is analogous to the use of multiple certificates in a certificate chain.

In computer security, digital certificates are verified using a chain of trust. The trust anchor for the digital certificate is the root certificate authority (CA).

The certificate hierarchy is a structure of certificates that allows individuals to verify the validity of a certificate's issuer. Certificates are issued and signed by certificates that reside higher in the certificate hierarchy, so the validity and trustworthiness of a given certificate is determined by the corresponding validity of the certificate that signed it.

The chain of trust of a certificate chain is an ordered list of certificates, containing an end-user subscriber certificate and intermediate certificates (that represents the intermediate CA), that enables the receiver to verify that the sender and all intermediates certificates are trustworthy. This process is best described in the page Intermediate certificate authority. See also X.509 certificate chains for a description of these concepts in a widely used standard for digital certificates.

## Är det säkert att lagra lösenorden till certifikaten till din dator? Varför/Varför inte?

//TODO

## Förklara HELA handshaket.
SSL-messages

1.  Client Hello

Information that the server needs to communicate with the client using SSL. This includes the SSL version number, cipher settings, session-specific data.

2.  Server Hello

Information that the server needs to communicate with the client using SSL. This includes the SSL version number, cipher settings, session-specific data.

3.  Authentication and Pre-Master Secret

Client authenticates the server certificate. (e.g. Common Name / Date / Issuer) Client (depending on the cipher) creates the pre-master secret for the session, Encrypts with the server's public key and sends the encrypted pre-master secret to the server.

4.  Decryption and Master Secret

Server uses its private key to decrypt the pre-master secret. Both Server and Client perform steps to generate the master secret with the agreed cipher.

5.  Encryption with Session Key

Both client and server exchange messages to inform that future messages will be encrypted.

------Further explanation------

1. The SSL or TLS client sends a "client hello" message that lists cryptographic information such as the SSL or TLS version and, in the client's order of preference, the CipherSuites supported by the client. The message also contains a random byte string that is used in subsequent computations. The protocol allows for the "client hello" to include the data compression methods supported by the client.

2. The SSL or TLS server responds with a "server hello" message that contains the CipherSuite chosen by the server from the list provided by the client, the session ID, and another random byte string. The server also sends its digital certificate. If the server requires a digital certificate for client authentication, the server sends a "client certificate request" that includes a list of the types of certificates supported and the Distinguished Names of acceptable Certification Authorities (CAs).

3. The SSL or TLS client verifies the server's digital certificate. For more information, see How SSL and TLS provide identification, authentication, confidentiality, and integrity.

4. The SSL or TLS client sends the random byte string that enables both the client and the server to compute the secret key to be used for encrypting subsequent message data. The random byte string itself is encrypted with the server's public key.

5. If the SSL or TLS server sent a "client certificate request", the client sends a random byte string encrypted with the client's private key, together with the client's digital certificate, or a "no digital certificate alert". This alert is only a warning, but with some implementations the handshake fails if client authentication is mandatory.

6. The SSL or TLS server verifies the client's certificate. For more information, see How SSL and TLS provide identification, authentication, confidentiality, and integrity.

7. The SSL or TLS client sends the server a "finished" message, which is encrypted with the secret key, indicating that the client part of the handshake is complete.

8. The SSL or TLS server sends the client a "finished" message, which is encrypted with the secret key, indicating that the server part of the handshake is complete.

9. For the duration of the SSL or TLS session, the server and client can now exchange messages that are symmetrically encrypted with the shared secret key.


## Förklara hur PKI fungerar.

The request for the Digital Certificate is sent to the appropriate Certificate Authority (also known as the “CA”).

After this specific request has been processed, the Digital Certificate is then issued to the entity that is requesting it.

The Digital Certificate then gets signed by confirming the actual identity of the person who is requesting that specific Digital Certificate.

The Digital Certificate can now be used to further encrypt the plaintext into the Ciphertext that is sent from the sending party to the receiving party.

//TODO How it's used

## När i handshaket används symmetriskt kryptering?
Symmetric encryption uses one key for both encryption and decryption.

//TODO NÄR

## När används asymmetriskt kryptering?
AKA public key cryptography

Asymmetric encryption uses two seperate keys, public/secret keys for encryption

//TODO NÄR

# Keywords:
## (JSSE) Java Secure Socket Extension
## X.509 
Standard for specifying a certificates format

## (TLS) Transport Layer Security 
## (SSL) Secure Socket Layer

## (RSA) Rivest Shamir Adleman
Assymmetric encryption, two keys, private/public, solves authentication, computing intensive(unsuited for encryption of larger data sets)
## (AES) Advanced Encryption Standard
Symmetric encryption, one common key, fast
## Private key 
## Public key

## Cipher Suite 

## (HTTPS) Secure HTTP

## Hash Algorithms
### (MD5) Message Digest 5
### (SHA) Secure Hash Algorithm
