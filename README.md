
# RSS Builder
This tool will enable anyone to build an RSS feed that supports the new [Podcast Namespace](https://github.com/Podcastindex-org/podcast-namespace) tags.

The purpose of the tool is to be able to easily experiment.

The vision is that users should be able to:
 - Toggle if they only want stable or also experiemental tags
 - Import their RSS feed
 - Do changes in a super easy way
 - Download the resulting RSS file
 - Then upload to their own server and be part of developing the new standard.
(This tool can also be used by hosts and app developers to test how the tags are supposed to look like)

This project is part of the [Podcast Index Project](https://www.podcastindex.org)


## Fully support tag list
### Channel
channel->title
channel->description (would be nice with a WYSIWYG editor maybe?)
channel->docs
channel->language
channel->managingEditor
channel->webMaster
channel->itunes:owner
channel->image
### Item
item->title
item->description
item->link
item->itunes:image
item->itunes:author
item->itunes:subtitle
  

## Partial support tag list
### Channel
- channel->pubDate 
Will import and export, but missing edit capabilities
- channel->lastBuildDate
Will import and export, but missing edit capabilities
- channel->link
missing edit capabilities if there is more than one link, exampe: [Podnews](http://podnews.net/rss/))

### Item
- item->enclosureUrl
Will import and export, but missing edit capabilities
- item->enclosureType
Will import and export, but missing edit capabilities
- item->enclosureLength
Will import and export, but missing edit capabilities
- item->guid
Will import and export, but missing edit capabilities
- item->pubDate
Will import and export, but missing edit capabilities

## Missing support tag list
channel->podcast:funding
channel->podcast:locked
channel->podcast: