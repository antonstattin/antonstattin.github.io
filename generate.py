# this file will generate the blog from the data..

import os, time
import argparse

#time.ctime(os.path.getmtime("test.txt"))
#time.ctime(os.path.getctime("test.txt"))

def _get_paths():
    # get path to posts
    dir_path = os.path.dirname(os.path.realpath(__file__))
    read_post = os.path.join(dir_path, 'posts')
    save_post = os.path.join(dir_path, 'html/posts')
    template_path = os.path.join(dir_path, 'html/post_template.html')
    blog_page_read = os.path.join(dir_path, 'html/blog_page_template.html')
    blog_page_save = os.path.join(dir_path, 'blog_list.html')
    navbar_path = os.path.join(dir_path, 'html/navbar_template.html')

    return {'read':read_post, 'save':save_post,
            'template':template_path,
            'blog_page_read':blog_page_read,
            'blog_page_save':blog_page_save,
            'navbar':navbar_path}

def _make_post(post, base_html, **d_paths):

    # add creation-date?

    print('- Creating Post "{}"'.format(post))
    with open(os.path.join(d_paths['read'], post)) as f_post:
        post_html = f_post.read()

    post_created = time.ctime(os.path.getmtime(os.path.join(d_paths['read'], post)))

    navbar_html = get_navbar_html()

    # update template with the new body and other tokens..
    new_post = base_html.replace("<%BODY%>", post_html)
    new_post = new_post.replace("<%TIME%>", post_created)
    new_post = new_post.replace("<%NAV%>", navbar_html)

    with open(os.path.join(d_paths['save'], post), "w") as f_post:
        f_post.write(new_post)

def get_navbar_html():
    d_paths = _get_paths()

    with open(d_paths['navbar']) as r_page:
        navbar_html = r_page.read()

    return navbar_html

def get_base_html():
    d_paths = _get_paths()

    base_html = ""
    with open(d_paths['template']) as f_template:
        base_html = f_template.read()

    return base_html

def update_all():

    d_paths = _get_paths()
    base_html = get_base_html()

    for post in os.listdir(d_paths['read']):
        _make_post(post, base_html, **d_paths)

def create_new():

    d_paths = _get_paths()
    old_posts = os.listdir(d_paths['save'])
    read_posts = os.listdir(d_paths['read'])
    new_posts = filter(lambda x: x not in old_posts, read_posts)

    if new_posts:
        base_html = get_base_html()
        for post in new_posts: _make_post(post, base_html, **d_paths)
    else:
        print "- No new posts to create.."


def update():

    d_paths = _get_paths()


    link_list_html = ""
    for post in os.listdir(d_paths['save']):
        post_created = time.ctime(os.path.getmtime(os.path.join(d_paths['read'], post)))
        link_list_html += '<a href=./html/posts/{post} class="list-group-item list-group-item-action">{post}</a>\n'.format(post=post)

    with open(d_paths['blog_page_read']) as r_page:
        blog_page_template = r_page.read()

    navbar_html = get_navbar_html()
    new_blog_page = blog_page_template.replace("<%NAV%>", navbar_html)
    new_blog_page = new_blog_page.replace("<%POSTS%>", link_list_html)

    with open(d_paths['blog_page_save'], "w") as w_page:
        w_page.write(new_blog_page)


if "__main__" == __name__:


    # simple argument for updating all
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', '--update', action='store_true')
    args = parser.parse_args()

    # build all
    if args.update:
        print('Updating All Posts')
        update_all()
    else:
        print('Creating Only New Posts')
        create_new()

    update()



'''

'''
