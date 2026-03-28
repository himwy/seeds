# Appwrite Database Setup Guide

## Contact Collection Setup

You need to create a collection in your Appwrite database with the following configuration:

### Collection Details
- **Collection ID**: `contact`
- **Collection Name**: `Contact Messages`

### Required Attributes

1. **name** (String)
   - Type: String
   - Size: 255
   - Required: Yes
   - Array: No

2. **email** (String)
   - Type: String
   - Size: 255
   - Required: Yes
   - Array: No

3. **message** (String)
   - Type: String
   - Size: 5000
   - Required: Yes
   - Array: No

4. **isRead** (Boolean)
   - Type: Boolean
   - Required: No
   - Default: false
   - Array: No

5. **isArchived** (Boolean)
   - Type: Boolean
   - Required: No
   - Default: false
   - Array: No

### Indexes (Optional but recommended for performance)

1. **status_index**
   - Type: key
   - Attributes: isRead, isArchived
   - Orders: ASC, ASC

2. **created_index**
   - Type: key
   - Attributes: $createdAt
   - Orders: DESC

### Permissions

Set the following permissions for your collection:

#### Read permissions:
- Any authenticated user (or specific admin role)

#### Create permissions:
- Any user (for contact form submissions)

#### Update permissions:
- Any authenticated user (or specific admin role)

#### Delete permissions:
- Any authenticated user (or specific admin role)

## Steps to Set Up:

1. Go to your Appwrite Console
2. Navigate to your project
3. Go to "Database" section
4. Create a new collection with ID: `contact`
5. Add all the attributes listed above
6. Set up the indexes for better performance
7. Configure permissions as needed
8. Your contact form should now work with the admin panel!

## Testing

Once set up, you can:
1. Submit a test message through your contact form
2. Go to `/admin/contacts` to view and manage messages
3. Filter messages by status (all/unread/read/archived)
4. Mark messages as read/unread
5. Archive or delete messages
